import subprocess
import sys
import paramiko

sys.stdout.reconfigure(encoding='utf-8')

VPS_HOST = '93.127.206.52'
VPS_USER = 'root'
VPS_PASS = 'Royal300@2026'
WEB_DIR = '/var/www/photographer'
DOMAIN = 'photographer.rasatech.in'

def run_local(cmd, desc=""):
    print(f"\n[LOCAL] {desc or cmd}")
    res = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if res.stdout:
        print(res.stdout.strip())
    if res.returncode != 0:
        if res.stderr:
            print(f"[LOCAL ERR] {res.stderr.strip()}")
        print(f"Warning/Error with exit code {res.returncode}")
    return res.returncode

def main():
    print("=" * 60)
    print(f"DEPLOYING TO {DOMAIN} ({VPS_HOST})")
    print("=" * 60)

    # 1. Local Git commit and push
    run_local("git add .", "Staging local changes")
    run_local('git commit -m "Auto-deploy update"', "Committing changes (if any)")
    push_code = run_local("git push origin main", "Pushing to GitHub (origin main)")

    # 2. Connect to VPS
    print(f"\nConnecting to VPS {VPS_HOST} as {VPS_USER}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS, timeout=15)
    print("Connected successfully!")

    # 3. Pull, build and reload on VPS
    remote_script = f"""
    set -e
    echo "=== 1. Pulling latest code in {WEB_DIR} ==="
    cd {WEB_DIR}
    git reset --hard HEAD
    git pull origin main

    echo "=== 2. Installing dependencies and building ==="
    npm install
    npm run build

    echo "=== 3. Reloading Nginx ==="
    systemctl reload nginx

    echo "=== 4. Health Check ==="
    curl -I -s https://{DOMAIN} | head -n 5
    """

    stdin, stdout, stderr = ssh.exec_command(remote_script)
    for line in iter(stdout.readline, ""):
        print(line, end="")
    err = stderr.read().decode('utf-8', errors='replace')
    if err.strip():
        print(f"\n[VPS STDERR]\n{err.strip()}")

    exit_code = stdout.channel.recv_exit_status()
    ssh.close()

    if exit_code == 0:
        print("\n" + "=" * 60)
        print(f"DEPLOYMENT SUCCESSFUL! Live at: https://{DOMAIN}")
        print("=" * 60)
    else:
        print(f"\nDeployment finished with error code: {exit_code}")
        sys.exit(exit_code)

if __name__ == '__main__':
    main()
