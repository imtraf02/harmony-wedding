export type UploadVideoResult = {
  success: boolean;
  url?: string;
  message?: string;
};

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

function generateUploadId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function uploadVideoFile(
  file: File,
  category: string,
  onProgress?: (progress: number) => void,
): Promise<UploadVideoResult> {
  // If the file is small, upload normally in a single request
  if (file.size <= CHUNK_SIZE) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();

      if (xhr.upload && onProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentage = Math.round((event.loaded / event.total) * 100);
            onProgress(percentage);
          }
        });
      }

      xhr.addEventListener("load", () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            const response = JSON.parse(xhr.responseText || "{}");
            resolve({
              success: false,
              message: response.message || `Lỗi tải video (${xhr.status})`,
            });
          }
        } catch (_e) {
          resolve({ success: false, message: "Phản hồi máy chủ không hợp lệ" });
        }
      });

      xhr.addEventListener("error", () => {
        resolve({ success: false, message: "Lỗi kết nối mạng" });
      });

      xhr.addEventListener("abort", () => {
        resolve({ success: false, message: "Đã hủy tải lên" });
      });

      xhr.open(
        "POST",
        `/api/admin/upload-video?category=${encodeURIComponent(category)}`,
      );
      xhr.setRequestHeader("content-type", file.type || "application/octet-stream");
      xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
      xhr.send(file);
    });
  }

  // Chunked upload for large video files
  return new Promise(async (resolve) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = generateUploadId();

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunkBlob = file.slice(start, end);

      const chunkResult = await new Promise<UploadVideoResult>((resolveChunk) => {
        const xhr = new XMLHttpRequest();

        if (xhr.upload && onProgress) {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const chunkProgress = event.loaded / event.total;
              const overallProgress = Math.round(
                ((chunkIndex + chunkProgress) / totalChunks) * 100
              );
              onProgress(Math.min(99, overallProgress));
            }
          });
        }

        xhr.addEventListener("load", () => {
          try {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolveChunk(JSON.parse(xhr.responseText));
            } else {
              const response = JSON.parse(xhr.responseText || "{}");
              resolveChunk({
                success: false,
                message: response.message || `Lỗi tải phân đoạn ${chunkIndex + 1} (${xhr.status})`,
              });
            }
          } catch (_e) {
            resolveChunk({ success: false, message: "Phản hồi máy chủ không hợp lệ" });
          }
        });

        xhr.addEventListener("error", () => {
          resolveChunk({ success: false, message: "Lỗi kết nối mạng" });
        });

        xhr.addEventListener("abort", () => {
          resolveChunk({ success: false, message: "Đã hủy tải lên" });
        });

        xhr.open(
          "POST",
          `/api/admin/upload-video?category=${encodeURIComponent(category)}`,
        );
        xhr.setRequestHeader("content-type", "application/octet-stream");
        xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
        xhr.setRequestHeader("x-upload-id", uploadId);
        xhr.setRequestHeader("x-chunk-index", chunkIndex.toString());
        xhr.setRequestHeader("x-total-chunks", totalChunks.toString());
        xhr.send(chunkBlob);
      });

      if (!chunkResult.success) {
        resolve(chunkResult);
        return;
      }

      // If it's the last chunk, it will return the final merged file url
      if (chunkIndex === totalChunks - 1) {
        onProgress?.(100);
        resolve(chunkResult);
        return;
      }
    }
  });
}
