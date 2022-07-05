const cacheName = "v1";
const cacheAssets =[
  "/index.html",
  "/home.html",
  "/landing.html",
  "/signin.html",
  "/signup.html",
  "/verification.html",
  "/support.html",
  "/get-started.html",
  "/listing.html",
  "/css/style.css",
  "/css/bootstrap-icons.css",
  "/js/app.js",
  "/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "/vendor/sidebar/hc-offcanvas-nav.js",
  "/vendor/bootstrap/css/bootstrap.min.css",
  "/vendor/icons/icofont.min.css",
  "/vendor/icons/icofont.min.css",
  "/vendor/sidebar/demo.css",
  "/vendor/slick/slick-theme.min.css",
  "/vendor/slick/slick.min.css",
  "/vendor/slick/slick.min.js",
  "/vendor/jquery/jquery.min.js",
 "/img/"

];


//Call install event

self.addEventListener('install',e=>{
    
    console.log("Service Worker : Installed");
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{
            
            console.log("Service Worker: Caching files");
            cache.addAll(cacheAssets)
        })
        .then(()=>self.skipWaiting())
        );
})

//Call activate event

self.addEventListener('activate',e=>{
    
    console.log("Service Worker : Activated");
    // remove unwanted caches
    
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache=>{
                    
                    if(cache !== cacheName){
                        
                        console.log("Service Worker : Clearing old cache");
                        return caches.delete(cache)
                    }
                })
                );
        })
        
        );
    
});

self.addEventListener('fetch',e=>{
    
    console.log("Service Worker: Fetching");
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
        )
    
})
