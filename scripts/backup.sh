#!/bin/bash
# scripts/backup.sh
# Tự động sao lưu database SQLite và thư mục ảnh upload.
# Đề xuất Cron (quyền root): 0 2 * * * /var/www/wedding/scripts/backup.sh >> /var/log/wedding-backup.log 2>&1

set -e

PROJECT_DIR="/var/www/wedding"
BACKUP_DIR="/var/backups/wedding"
DATE=$(date +%Y-%m-%d_%H%M%S)

# Tạo thư mục backup nếu chưa có
mkdir -p "$BACKUP_DIR"

echo "[$DATE] 🔄 Bắt đầu sao lưu..."

# 1. Sao lưu Database SQLite (Dùng lệnh .backup của sqlite3 để an toàn khi đang có kết nối)
if [ -f "$PROJECT_DIR/database/wedding.db" ]; then
    sqlite3 "$PROJECT_DIR/database/wedding.db" ".backup '$BACKUP_DIR/wedding_$DATE.db'"
    echo "[$DATE]  - Database backed up: wedding_$DATE.db"
fi

# 2. Sao lưu thư mục ảnh uploads
if [ -d "$PROJECT_DIR/public/uploads" ]; then
    tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C "$PROJECT_DIR/public" uploads/
    echo "[$DATE]  - Uploads backed up: uploads_$DATE.tar.gz"
fi

# 3. Dọn dẹp: Chỉ giữ lại 30 bản sao lưu gần nhất
ls -t "$BACKUP_DIR"/*.db     | tail -n +31 | xargs -r rm --
ls -t "$BACKUP_DIR"/*.tar.gz | tail -n +31 | xargs -r rm --

echo "[$DATE] ✅ Sao lưu hoàn tất!"
