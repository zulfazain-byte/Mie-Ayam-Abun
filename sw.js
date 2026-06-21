const CACHE_NAME = 'pos-miayam-abun-v6';

// Daftar file yang akan disimpan secara offline
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './abun200.png',
    './abun500.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdn.sheetjs.com/xlsx-0.18.5/package/dist/xlsx.full.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cached) => {
            // Ambil dari cache jika ada, jika tidak ambil dari internet
            const fetchPromise = fetch(e.request).then((response) => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);
            return cached || fetchPromise;
        })
    );
});
