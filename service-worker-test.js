console.log('Service worker loaded !');

const cacheVersion = 'v6';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion)
      .then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/js/app.js',
          '/js/idb.js',
          '/js/network.js',
          '/js/views/Todo.js',
          '/js/views/EditTodo.js',
          '/js/component/todoCard.js',
          '/js/api/todo.js',
          '/css/index.css',
          '/manifest.json',
          '/img/icon.ico',
          '/img/logo.webp',
          '/img/manifest/icon-192x192.png',
          '/img/manifest/icon-512x512.png',
          '/node_modules/page/page.mjs',
          '/node_modules/idb/build/esm/index.js',
          '/node_modules/idb/build/esm/wrap-idb-value.js',
          '/config.json',
          '/node_modules/es-dev-server'
        ])
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request)
            .then(function(response) {
              caches.open(cacheVersion)
                return response;
            })
        })
        .catch(function() {
          return caches.match('index.html');
        })
    )
  }
});

/*self.addEventListener('message', function(event) {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});*/
