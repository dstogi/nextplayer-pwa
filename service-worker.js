// Neue Version, damit der alte Cache sicher weg ist:
const CACHE = 'nextplayer-cache-v2';

const FILES = [
  './',
  './index.html',
  './manifest.json',
  './NextPlayer-192.png',
  './NextPlayer-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
