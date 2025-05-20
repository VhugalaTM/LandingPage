// CREATE CACHE NAME AS GLOBAL SCOPE
var staticCacheName='site-static-v17';

// DEFINE A LIST OF RESOURCES YOU WANT TO BE CACHED
var assets=[
    '/',
    '/index.html',
    '/landing-page.html',
    '/landing-page.css',
    '/assets/Desktop.jpg',
    '/assets/Mobile.jpg',
    '/assets/Tablet.jpg',
    '/assets/BlueSignature_PERSONAL_USE_ONLY.otf',
    '/assets/Codec-Cold-Light-trial.ttf',
    '/assets/FIGHTBACK.ttf',
    '/app.js',
    '/other-pages/about.html',
    '/other-pages/about.css',
    '/other-pages/feedback.html',
    '/other-pages/feedback.css',
    '/assets/css/all.css',
    '/assets/webfonts'
];

// INSTALL THE SERVICE APP
self.addEventListener('install', evt =>{
    //console.log('Service Worker has been installed');
    // CREATING THE CACHE API
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            //console.log('caching main assets');
            cache.addAll(assets);
        })
    )

})

//  ACTIVATE THE SERVICE WORKER
self.addEventListener('activate', evt =>{
    //console.log('Service Worker Has Been activated');
    
    //THE FOLLOWING LINE OF CODE IS USED FOR CACHE VERSIONING
    evt.waitUntil(
        caches.keys().then(keys=>{
                return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))
            )
        })
    )
})

// SETTING UP FETCH EVENTS
self.addEventListener('fetch', evt =>{
    //console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})