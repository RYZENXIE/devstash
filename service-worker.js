const CACHE_NAME = 'devstash-v1';
const urlsToCache = [
    '.',
    'index.html',
    'css/style.css',
    'js/app.js',
    'js/snippets.js',
    'js/colors.js',
    'js/markdown.js',
    'js/daily-tip.js',
    'manifest.json',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png'
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

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});