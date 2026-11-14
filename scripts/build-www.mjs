// App Android chỉ là "khung" mở trang https://nvanbao.github.io/Coach_gym/ (xem capacitor.config.json),
// nên mỗi lần bạn cập nhật web, app tự có bản mới mà không cần cài lại APK.
// Thư mục www/ chỉ cần có index.html (Capacitor yêu cầu) và offline.html (hiện khi chưa từng mở app lúc có mạng).
import fs from 'node:fs';

fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www', { recursive: true });
fs.copyFileSync('index.html', 'www/index.html');
fs.writeFileSync('www/offline.html', `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gym Coach</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d0f12;color:#e6e8eb;font:16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}
button{margin-top:16px;background:#3ddc97;color:#000;border:0;border-radius:10px;padding:12px 22px;font-weight:700;font-size:16px}</style></head>
<body><div><h2>Chưa có kết nối mạng</h2><p>Lần đầu mở Gym Coach cần có mạng để tải app.<br>Sau đó app mở được cả khi không có mạng.</p><button onclick="location.reload()">Thử lại</button></div></body></html>`);
console.log('OK: đã tạo www/ (index.html, offline.html)');
