// Tạo thư mục www/ từ index.html: tải sẵn các thư viện CDN về lib/ để app chạy được khi không có mạng.
import fs from 'node:fs';

const LIBS = [
  ['https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js', 'tf.min.js'],
  ['https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.3/dist/pose-detection.min.js', 'pose-detection.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'three.min.js'],
  ['https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js', 'firebase-app-compat.js'],
  ['https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js', 'firebase-auth-compat.js'],
  ['https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js', 'firebase-firestore-compat.js'],
];

fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www/lib', { recursive: true });
let html = fs.readFileSync('index.html', 'utf8');

for (const [url, name] of LIBS) {
  if (!html.includes(url)) throw new Error(`index.html không còn dòng script: ${url}`);
  if (process.env.SKIP_DOWNLOAD === '1') {
    fs.writeFileSync(`www/lib/${name}`, '/* skipped */');
  } else {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Tải thất bại ${res.status}: ${url}`);
    const body = Buffer.from(await res.arrayBuffer());
    if (body.length < 1000) throw new Error(`File quá nhỏ, có thể lỗi: ${url}`);
    fs.writeFileSync(`www/lib/${name}`, body);
  }
  html = html.replace(url, `lib/${name}`);
}

fs.writeFileSync('www/index.html', html);
console.log('OK: đã tạo www/ với', LIBS.length, 'thư viện nội bộ');
