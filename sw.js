// Service worker: giúp app mở được khi không có mạng. Đổi V (ví dụ v2) khi muốn buộc máy tải lại toàn bộ.
const V = 'gymcoach-v1', SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'];
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'www.gstatic.com', 'tfhub.dev', 'www.kaggle.com', 'storage.googleapis.com'];
const keep = (r, res) => { if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)).catch(() => {}); } return res; };
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k != V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method != 'GET') return;
  const u = new URL(r.url);
  if (u.origin == location.origin) { // file của app: ưu tiên mạng để luôn có bản mới, mất mạng thì dùng bản đã lưu
    e.respondWith(fetch(r).then(res => keep(r, res)).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
  } else if (CDN.includes(u.hostname)) { // thư viện và mô hình AI: có bản lưu thì dùng luôn
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => keep(r, res))));
  } // các yêu cầu Firebase (đăng nhập, dữ liệu) không bị can thiệp
});
