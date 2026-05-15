#!/bin/bash
# scripts/deploy.sh
# Hướng dẫn: Chạy script này bằng quyền wedding-user hoặc root (nếu dùng sudo).
# Cách chạy: bash scripts/deploy.sh

set -e

# Đường dẫn dự án
PROJECT_DIR="/var/www/wedding"
cd "$PROJECT_DIR"

echo "🚀 Bắt đầu quá trình triển khai: $(date)"

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
# Chạy migration bổ sung nếu cần
pnpm tsx scripts/migrate-gallery.ts

# 4. Build ứng dụng
echo "🏗️ Đang build ứng dụng Next.js..."
pnpm build

# 5. Khởi động lại dịch vụ qua Systemd
# Lưu ý: Lệnh này yêu cầu sudo hoặc quyền passwordless sudo cho systemctl
echo "🔄 Đang khởi động lại dịch vụ harmony-wedding..."
sudo systemctl restart harmony-wedding

echo "✅ Triển khai hoàn tất thành công! $(date)"
