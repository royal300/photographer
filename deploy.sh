#!/usr/bin/env bash
set -e

# ==============================================================================
# Apurba Dutta Photography - One-Click Deployment Script
# Target: photographer.rasatech.in (93.127.206.52)
# ==============================================================================

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "============================================================"
echo " Starting Deployment for photographer.rasatech.in"
echo "============================================================"

# If Python with paramiko is available, use deploy.py for cross-platform reliability
if command -v python >/dev/null 2>&1; then
    python deploy.py
elif command -v python3 >/dev/null 2>&1; then
    python3 deploy.py
else
    echo "[1/3] Pushing changes to GitHub..."
    git add .
    git commit -m "Auto-deploy update" || true
    git push origin main

    echo "[2/3] Connecting to VPS and rebuilding..."
    ssh root@93.127.206.52 "cd /var/www/photographer && git pull origin main && npm install && npm run build && systemctl reload nginx"

    echo "[3/3] Testing live website..."
    curl -I https://photographer.rasatech.in
fi
