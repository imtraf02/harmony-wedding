export type UploadImageResult = {
  success: boolean;
  url?: string;
  message?: string;
};

export function uploadImageFile(
  file: File,
  category: string,
  onProgress?: (progress: number) => void,
): Promise<UploadImageResult> {
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
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          const response = JSON.parse(xhr.responseText || "{}");
          resolve({
            success: false,
            message: response.message || `Lỗi tải lên (${xhr.status})`,
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
      `/api/admin/upload-image?category=${encodeURIComponent(category)}`,
    );
    xhr.setRequestHeader("content-type", file.type || "application/octet-stream");
    xhr.setRequestHeader("x-file-name", encodeURIComponent(file.name));
    xhr.send(file);
  });
}
