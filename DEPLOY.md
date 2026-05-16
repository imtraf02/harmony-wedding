# Hướng dẫn Triển khai (Deployment Guide) - NixOS Minimal

Tài liệu này hướng dẫn cách đưa dự án **Harmony Wedding** từ GitHub lên server chạy **NixOS Minimal**, cấu hình Systemd, Nginx và SSL.

---

## 1. Cấu hình Server (NixOS)

Đảm bảo file `/etc/nixos/configuration.nix` của bạn có các thành phần sau:

```nix
{ config, pkgs, ... }: {
  # Cài đặt môi trường
  environment.systemPackages = with pkgs; [
    nodejs_20 nodePackages.pnpm git sqlite
  ];

  # SSH root với password (nếu cần)
  services.openssh = {
    enable = true;
    settings = { PasswordAuthentication = true; PermitRootLogin = "yes"; };
  };

  # User chạy ứng dụng
  users.users.wedding-user = {
    isSystemUser = true;
    group = "wedding-group";
    home = "/var/www/wedding";
  };
  users.groups.wedding-group = {};

  # Tự động gia hạn SSL Let's Encrypt
  security.acme = {
    acceptTerms = true;
    defaults.email = "your-email@gmail.com"; # THAY EMAIL CỦA BẠN
  };

  # Nginx Reverse Proxy + SSL
  services.nginx = {
    enable = true;
    virtualHosts."your-domain.com" = { # THAY DOMAIN CỦA BẠN
      enableACME = true;
      forceSSL = true;
      locations."/" = {
        proxyPass = "http://localhost:3000";
        proxyWebsockets = true;
      };
    };
  };

  # Systemd Service
  systemd.services.harmony-wedding = {
    description = "Harmony Wedding App";
    wantedBy = [ "multi-user.target" ];
    serviceConfig = {
      ExecStart = "${pkgs.nodePackages.pnpm}/bin/pnpm start";
      WorkingDirectory = "/var/www/wedding";
      User = "wedding-user";
      Restart = "always";
      StateDirectory = "wedding";
      Environment = [
        "NODE_ENV=production"
        "PORT=3000"
        "DATABASE_PATH=/var/lib/wedding/wedding.db"
        "UPLOAD_DIR=/var/lib/wedding/uploads"
      ];
    };
  };

  networking.firewall.allowedTCPPorts = [ 80 443 22 ];
}
```

Sau khi sửa, chạy: `nixos-rebuild switch`

---

## 2. Triển khai Mã nguồn

Thực hiện các bước sau với quyền `root` trên server:

### Bước 1: Chuẩn bị thư mục
```bash
mkdir -p /var/www/wedding
mkdir -p /var/lib/wedding/uploads
chown -R wedding-user:wedding-group /var/www/wedding
chown -R wedding-user:wedding-group /var/lib/wedding
```

### Bước 2: Clone Code
```bash
sudo -u wedding-user -s
cd /var/www/wedding
git clone https://github.com/imtraf02/harmony-wedding.git .
```

### Bước 3: Cấu hình Environment
```bash
cp .env.example .env
# Sửa file .env bằng nano hoặc vim để điền các thông tin bí mật
nano .env
```

Đặt database ngoài thư mục source để `git pull` không đụng vào dữ liệu runtime:

```env
DATABASE_PATH=/var/lib/wedding/wedding.db
UPLOAD_DIR=/var/lib/wedding/uploads
```

### Bước 4: Cài đặt và Build
```bash
pnpm install
pnpm build
```

### Bước 5: Khởi tạo Database & Admin
```bash
# Tạo database ban đầu
pnpm tsx scripts/init-db.ts

# Tạo tài khoản admin để đăng nhập
pnpm tsx scripts/create-admin.ts <username> <password>
```

---

## 3. Khởi động ứng dụng

Thoát khỏi user `wedding-user` quay lại `root` và chạy:

```bash
systemctl restart harmony-wedding
systemctl status harmony-wedding
```

Để xem log trực tiếp:
```bash
journalctl -fu harmony-wedding
```

---

## 4. Cập nhật Code mới (CI/CD thủ công)

Mỗi khi bạn push code mới lên GitHub, hãy chạy lệnh này trên server:

```bash
sudo -u wedding-user -s
cd /var/www/wedding
git pull
pnpm install
pnpm tsx scripts/init-db.ts
pnpm tsx scripts/migrate-gallery.ts
pnpm build
exit
systemctl restart harmony-wedding
```
