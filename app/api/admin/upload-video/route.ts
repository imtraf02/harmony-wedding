import crypto from "node:crypto";
import { once } from "node:events";
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

  const body = request.body;
  if (!body) {
    return NextResponse.json(
      { success: false, message: "No file found" },
      { status: 400 },
    );
  }

  const maxSize = VIDEO_UPLOAD_MAX_MB * 1024 * 1024;
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxSize) {
    return NextResponse.json(
      { success: false, message: `Video tối đa ${VIDEO_UPLOAD_MAX_MB}MB` },
      { status: 413 },
    );
  }

  const fileType = request.headers.get("content-type") || "";
  const originalName = parseFilename(request.headers.get("x-file-name"));
  const ext = path.extname(originalName).toLowerCase();

  if (!fileType.startsWith("video/") || !VIDEO_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      {
        success: false,
        message: "Chỉ hỗ trợ video MP4, WebM, OGG, MOV hoặc M4V",
      },
      { status: 400 },
    );
  }

  let filepath = "";
  try {
    const url = new URL(request.url);
    const category = parseCategory(url.searchParams.get("category"));
    const dir = resolveUploadDir(category);
    const filename = `${crypto.randomBytes(8).toString("hex")}${ext}`;
    filepath = path.join(dir, filename);

    await fs.mkdir(dir, { recursive: true });

    const reader = body.getReader();
    const fileStream = createWriteStream(filepath, { flags: "wx" });
    let uploadedBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        uploadedBytes += value.byteLength;
        if (uploadedBytes > maxSize) {
          throw new Error(`Video tối đa ${VIDEO_UPLOAD_MAX_MB}MB`);
        }

        if (!fileStream.write(value)) {
          await once(fileStream, "drain");
        }
      }
    } finally {
      fileStream.end();
      await once(fileStream, "finish");
    }

    return NextResponse.json({
      success: true,
      url: `/uploads/${category}/videos/${filename}`,
    });
  } catch (err) {
    if (filepath) {
      await fs.unlink(filepath).catch(() => {});
    }

    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Upload failed",
      },
      { status: 400 },
    );
  }
}
