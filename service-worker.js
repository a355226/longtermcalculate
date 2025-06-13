const CACHE_NAME = 'longterm-calc-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// 安裝時快取資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 拦截 fetch 請求
self.addEventListener('fetch', event => {
  // ✅ 判斷是否是 HTML 主頁請求（如 index.html）
  if (event.request.mode === 'navigate') {
    // 直接從網路抓，不使用快取（避免卡住舊版）
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 其餘請求照原邏輯處理
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.skipWaiting(); // 讓新 SW 立刻啟用
self.clients.claim(); // 立刻接管頁面
