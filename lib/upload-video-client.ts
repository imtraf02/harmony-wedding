export type UploadVideoResult = {
  success: boolean;
  url?: string;
  message?: string;
};

export async function uploadVideoFile(
  file: File,
  category: string,
): Promise<UploadVideoResult> {
  const response = await fetch(
    `/api/admin/upload-video?category=${encodeURIComponent(category)}`,
    {
      method: "POST",
      headers: {
        "content-type": file.type || "application/octet-stream",
        "x-file-name": encodeURIComponent(file.name),
      },
      body: file,
    },
  );

  const result = (await response.json().catch(() => ({
    success: false,
    message: "Upload failed",
  }))) as UploadVideoResult;

  if (!response.ok && !result.message) {
    return { success: false, message: "Upload failed" };
  }

  return result;
}
