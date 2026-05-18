#!/bin/bash
# scripts/cleanup-uploads.sh

# Thiết lập đường dẫn mặc định
export DATABASE_PATH="${DATABASE_PATH:-/var/lib/wedding/wedding.db}"
export UPLOAD_DIR="${UPLOAD_DIR:-/var/lib/wedding/uploads}"

echo "🗄️ Đang kiểm tra thư mục: $UPLOAD_DIR"
echo "🗄️ Đối chiếu với Database: $DATABASE_PATH"

# Chạy script TypeScript qua pnpm
pnpm tsx scripts/cleanup-uploads.ts
