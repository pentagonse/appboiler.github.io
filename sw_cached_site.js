const cacheName = "v2";
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
    
    
});

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
        fetch(e.request)
        .then(res=>{
            //make copy/clone
            const resClone = res.clone();
            //open cache
            caches
            .open(cacheName)
            .then(cache=>{
                // Add response to cache....
                cache.put(e.request,resClone);
                
            });
            return res;
            
        }).catch(err=>caches.match(e.request).then(res=>res))
        )
    
})
