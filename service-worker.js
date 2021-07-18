let CACHE_VERSION = '0.0.6';

let CURRENT_CACHE = {
    static : 'static-cache-v' + CACHE_VERSION,
    dynamic : 'dynamic-cache-v' + CACHE_VERSION
};

self.addEventListener('install' , (event) => {
    // event.waitUntil(
    //     caches.open(CURRENT_CACHE['static'])
    //         .then((cache) => {
    //             cache.addAll([
    //                 '/',
    //             ]);
    //         })
    // )
})

self.addEventListener('activate' , (event) => {
    let expectedCacheNames = Object.values(CURRENT_CACHE);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.forEach(cacheName => {
                    if(! expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting out of date cache:' , cacheName);

                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )

});

self.addEventListener('fetch' , (event) => {
    event.respondWith(
        caches.open(CURRENT_CACHE['static']).then((cache) => {
            return cache.match(event.request).then(response => {
                if(response) {

                    return response;
                }  
                return fetch(event.request).then(networkResponse => {
                    cache.put(event.request , networkResponse.clone());
                    return networkResponse;
                }).catch(err => {
                    throw err;
                })
            })
        })
    )
});

// self.addEventListener('fetch' , (event) => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             if(response) return response;

//             return fetch(event.request).then(networkResponse => {
//                 caches.open(CURRENT_CACHE['dynamic'])
//                     .then(cache => {
//                         cache.put(event.request , networkResponse.clone());
//                         return networkResponse;
//                     })
//             })
//         })
//     )
// });



