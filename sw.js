// Lets the app install to the Home Screen / Start menu and show alerts. Live data is never cached.
const SHELL = "rzw-v2";
self.addEventListener("install", e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(["manifest.webmanifest", "icon-192.png"]))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;               // ESPN requests go straight to the network
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: "window"}).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow("./")));
});
