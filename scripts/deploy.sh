#!/bin/bash
set -e
cd /var/www/wedding
git pull origin main
npm ci --prefer-offline
npm run build
pm2 reload wedding --update-env
echo "Deploy complete: $(date)"
