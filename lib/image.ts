import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { UPLOAD_DIR } from './constants';


export interface UploadResult {
  url: string;   // /uploads/portfolio/abc123.webp
  blurDataUrl: string;   // base64 8×8 blur placeholder
  width: number;
  height: number;
}

/**
 * Process an uploaded buffer: resize, convert to WebP, generate blur placeholder.
 * @param buffer   Raw file buffer
 * @param category 'portfolio' | 'studios' | 'blog'
 * @param maxWidth Max width in pixels (default 1920)
 */
export async function processImage(
  buffer: Buffer,
  category: string,
  maxWidth: number = 1920,
): Promise<UploadResult> {
  const id = crypto.randomBytes(8).toString('hex');
  const absDir = path.isAbsolute(UPLOAD_DIR) ? path.join(UPLOAD_DIR, category) : path.join(process.cwd(), UPLOAD_DIR, category);
  const filename = `${id}.webp`;
  const absPath = path.join(absDir, filename);

  await fs.mkdir(absDir, { recursive: true });

  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Resize only if wider than maxWidth
  const pipeline = metadata.width && metadata.width > maxWidth
    ? image.resize(maxWidth, undefined, { withoutEnlargement: true })
    : image;

  const [finalMeta] = await Promise.all([
    pipeline.webp({ quality: 82 }).toFile(absPath).then(info => info),
  ]);

  // 8×8 blur placeholder
  const blurBuffer = await sharp(buffer)
    .resize(8, 8, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

  return {
    url: `/uploads/${category}/${filename}`,
    blurDataUrl,
    width: finalMeta.width ?? 0,
    height: finalMeta.height ?? 0,
  };
}
