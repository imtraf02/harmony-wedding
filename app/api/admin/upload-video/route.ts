import crypto from "node:crypto";
import { createWriteStream, promises as fs } from "node:fs";
import path from "node:path";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type SessionData, sessionOptions } from "@/lib/auth";
import { UPLOAD_DIR, VIDEO_UPLOAD_MAX_MB } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);

function resolveUploadDir(category: string) {
  return path.isAbsolute(UPLOAD_DIR)
    ? path.join(UPLOAD_DIR, category, "videos")
    : path.join(process.cwd(), UPLOAD_DIR, category, "videos");
}

function resolveTempDir(uploadId: string) {
  return path.isAbsolute(UPLOAD_DIR)
    ? path.join(UPLOAD_DIR, "tmp", uploadId)
    : path.join(process.cwd(), UPLOAD_DIR, "tmp", uploadId);
}

function parseCategory(value: string | null) {
  const category = value?.trim() || "portfolio";
  const parts = category.split("/").filter(Boolean);

  if (
    parts.length === 0 ||
    parts.length > 3 ||
    parts.some((part) => !/^[a-z0-9-]+$/i.test(part))
  ) {
    throw new Error("Danh mục upload không hợp lệ");
  }

  return parts.join("/");
}

function parseFilename(value: string | null) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return value || "";
  }
}

async function requireAdmin() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  return Boolean(session.isLoggedIn);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const url = new URL(request.url);
    const category = parseCategory(url.searchParams.get("category"));

    // Check if it's a chunked upload
    const uploadId = request.headers.get("x-upload-id") || "";
    const chunkIndexStr = request.headers.get("x-chunk-index");
    const totalChunksStr = request.headers.get("x-total-chunks");
    const originalName = parseFilename(request.headers.get("x-file-name"));
    const ext = path.extname(originalName).toLowerCase();

    if (!VIDEO_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          success: false,
          message: "Chỉ hỗ trợ video MP4, WebM, OGG, MOV hoặc M4V",
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If it's a standard single-file upload (no chunk headers)
    if (!uploadId || chunkIndexStr === null || totalChunksStr === null) {
      const maxSize = VIDEO_UPLOAD_MAX_MB * 1024 * 1024;
      if (buffer.length > maxSize) {
        return NextResponse.json(
          { success: false, message: `Video tối đa ${VIDEO_UPLOAD_MAX_MB}MB` },
          { status: 413 },
        );
      }

      const dir = resolveUploadDir(category);
      const filename = `${crypto.randomBytes(8).toString("hex")}${ext}`;
      const filepath = path.join(dir, filename);

      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filepath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${category}/videos/${filename}`,
      });
    }

    // Chunked Upload logic
    const chunkIndex = parseInt(chunkIndexStr, 10);
    const totalChunks = parseInt(totalChunksStr, 10);

    // Validate chunk numbers and upload ID
    if (
      Number.isNaN(chunkIndex) ||
      Number.isNaN(totalChunks) ||
      !/^[a-zA-Z0-9_-]{8,64}$/.test(uploadId)
    ) {
      return NextResponse.json(
        { success: false, message: "Thông số chunk không hợp lệ" },
        { status: 400 },
      );
    }

    const tempDir = resolveTempDir(uploadId);
    await fs.mkdir(tempDir, { recursive: true });

    // Save the current chunk
    const chunkPath = path.join(tempDir, `chunk_${chunkIndex}`);
    await fs.writeFile(chunkPath, buffer);

    // Check if we received all chunks
    const files = await fs.readdir(tempDir);
    const chunkFiles = files.filter((f) => f.startsWith("chunk_"));

    if (chunkFiles.length === totalChunks) {
      // All chunks are uploaded, merge them
      const dir = resolveUploadDir(category);
      const filename = `${crypto.randomBytes(8).toString("hex")}${ext}`;
      const filepath = path.join(dir, filename);

      await fs.mkdir(dir, { recursive: true });

      // Merge sequential chunks to the final file path
      const writeStream = createWriteStream(filepath);

      for (let i = 0; i < totalChunks; i++) {
        const partPath = path.join(tempDir, `chunk_${i}`);
        const partBuffer = await fs.readFile(partPath);
        writeStream.write(partBuffer);
        // Delete chunk file immediately to save space
        await fs.unlink(partPath).catch(() => {});
      }

      writeStream.end();
      
      // Clean up the temp directory
      await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});

      return NextResponse.json({
        success: true,
        url: `/uploads/${category}/videos/${filename}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Đã tải lên phân đoạn ${chunkIndex + 1}/${totalChunks}`,
    });
  } catch (err) {
    console.error("Video upload error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Upload failed",
      },
      { status: 400 },
    );
  }
}
