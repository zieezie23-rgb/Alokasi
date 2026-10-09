const V='alokasi-pwa-5',SHELL=['./','./index.html','./manifest.webmanifest','./assets/icon.png','./termin.json','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>0)))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
if(new URL(e.request.url).pathname.endsWith('/termin.json')){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));return}
e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r})))});
