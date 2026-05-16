#!/bin/bash
# scripts/create-admin.sh

# Thiết lập đường dẫn mặc định giống như trong deploy.sh
export DATABASE_PATH="${DATABASE_PATH:-/var/lib/wedding/wedding.db}"

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "❌ Thiếu tham số."
  echo "Sử dụng: bash scripts/create-admin.sh <username> <password>"
  echo "Database hiện tại: $DATABASE_PATH"
  exit 1
fi

echo "🗄️ Đang làm việc với Database: $DATABASE_PATH"

# Chạy script TypeScript qua pnpm
pnpm tsx scripts/create-admin.ts "$1" "$2"
