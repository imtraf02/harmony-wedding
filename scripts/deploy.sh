#!/bin/bash
# scripts/deploy.sh
# Hướng dẫn: Chạy script này bằng quyền wedding-user hoặc root (nếu dùng sudo).
# Cách chạy: bash scripts/deploy.sh

set -e

# Đường dẫn dự án
PROJECT_DIR="/var/www/wedding"
export DATABASE_PATH="${DATABASE_PATH:-/var/lib/wedding/wedding.db}"
export UPLOAD_DIR="${UPLOAD_DIR:-/var/lib/wedding/uploads}"
cd "$PROJECT_DIR"

echo "🚀 Bắt đầu quá trình triển khai: $(date)"
echo "🗄️ Database path: $DATABASE_PATH"

mkdir -p "$(dirname "$DATABASE_PATH")" "$UPLOAD_DIR"
test -w "$(dirname "$DATABASE_PATH")" || {
  echo "❌ Không có quyền ghi vào $(dirname "$DATABASE_PATH")."
  echo "   NixOS: thêm tmpfiles cho /var/lib/wedding hoặc chạy:"
  echo "   sudo install -d -o wedding-user -g wedding-group -m 0755 /var/lib/wedding /var/lib/wedding/uploads"
  exit 1
}

# 1. Lấy mã nguồn mới nhất
echo "📦 Đang lấy code mới từ GitHub..."
git pull origin main

# 2. Cài đặt dependencies
echo "📥 Đang cài đặt thư viện..."
pnpm install

# 3. Chạy migrations / init database
echo "🗄️ Đang kiểm tra và cập nhật Database..."
# Lệnh init-db sẽ tạo bảng nếu chưa có (idempotent)
pnpm tsx scripts/init-db.ts

# 4. Build ứng dụng
echo "🏗️ Đang build ứng dụng Next.js..."
pnpm build

# 5. Khởi động lại dịch vụ qua Systemd
# Lưu ý: Lệnh này yêu cầu sudo hoặc quyền passwordless sudo cho systemctl
echo "🔄 Đang khởi động lại dịch vụ harmony-wedding..."
sudo systemctl restart harmony-wedding

echo "✅ Triển khai hoàn tất thành công! $(date)"
