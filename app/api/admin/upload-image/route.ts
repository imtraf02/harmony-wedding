import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type SessionData, sessionOptions } from "@/lib/auth";
import { processImage } from "@/lib/image";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    // We can read the whole body into memory as an arrayBuffer
    // since images are typically small (under 20MB)
    const arrayBuffer = await request.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { success: false, message: "No file found" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(arrayBuffer);
    const result = await processImage(buffer, category);

    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (err) {
    console.error("Image upload API error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Upload failed",
      },
      { status: 400 },
    );
  }
}
