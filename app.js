// Registrar Service Worker SOLO para GitHub Pages
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/Tutoriales/sw.js')
      .then((reg) => console.log('Service Worker registrado:', reg.scope))
      .catch((err) => console.error('Error al registrar Service Worker:', err));
  });
}

// Botón "Omitir"
const omitBtn = document.getElementById('omitBtn');
omitBtn?.addEventListener('click', () => {
  localStorage.setItem('guest', 'true');
  window.location.href = 'bienvenida.html';
});

// PWA install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.hidden = false;
});

installBtn?.addEventListener('click', async () => {
  installBtn.hidden = true;
  if (!deferredPrompt) return;
  await deferredPrompt.prompt();
});




