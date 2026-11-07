const V="cfo-plano-v1";
const ARQ=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>{
    const f=fetch(e.request).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp))}return res}).catch(()=>r||caches.match("index.html"));
    return r||f;
  }));
});
