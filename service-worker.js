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
  event.respondWith(
    caches.match(event.request).then(response => {
      // 優先使用快取，否則嘗試網路請求
      return response || fetch(event.request);
    })
  );
});
self.skipWaiting(); // 讓新 SW 立刻啟用
self.clients.claim(); // 立刻接管頁面
