const CACHE_NAME = 'abun-pos-v1';
const urlsToCache = [
  '/',
  'index.html',        // sesuaikan dengan nama file Anda
  'manifest.json',
  'abun200.png',
  'abun500.png'
  // tambahkan asset statis lain jika ada
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
