#!/bin/bash
# Cron: 0 2 * * * /var/www/wedding/scripts/backup.sh >> /var/log/wedding-backup.log 2>&1
set -e
BACKUP_DIR="/var/backups/wedding"
DATE=$(date +%Y-%m-%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

sqlite3 /var/www/wedding/database/wedding.db ".backup '$BACKUP_DIR/wedding_$DATE.db'"
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C /var/www/wedding/public uploads/

ls -t "$BACKUP_DIR"/*.db     | tail -n +31 | xargs -r rm --
ls -t "$BACKUP_DIR"/*.tar.gz | tail -n +31 | xargs -r rm --
echo "[$DATE] Backup OK"
