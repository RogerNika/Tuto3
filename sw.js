// Nombre del caché
const CACHE = 'app-cache-v1';

// Archivos que se van a cachear (todas las páginas y recursos principales)
const ASSETS = [
  '/Tutoriales/',
  '/Tutoriales/index.html',
  '/Tutoriales/bienvenida.html',
  '/Tutoriales/sensores.html',
  '/Tutoriales/servicios.html',
  '/Tutoriales/librerias.html',
  '/Tutoriales/seguridad.html',
  '/Tutoriales/despliegue.html',
  '/Tutoriales/distribucion.html',
  '/Tutoriales/referencias.html',
  '/Tutoriales/styles.css',
  '/Tutoriales/app.js',
  '/Tutoriales/auth.js',
  '/Tutoriales/firebase.js',
  '/Tutoriales/manifest.webmanifest',
  '/Tutoriales/192192.png',
  '/Tutoriales/favicon_berty--android-chrome-512x512.png'
];

// Evento de instalación: guarda los recursos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Evento de activación: limpia cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Evento de fetch: responde con caché si no hay conexión
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/Tutoriales/bienvenida.html');
          }
        })
      );
    })
  );
});


