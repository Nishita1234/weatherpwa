const cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/weatherpwa/static/js/main.chunk.js',
                '/weatherpwa/static/js/bundle.js',
                '/index.html',
                '/',

            ])
        })
    )
})
this.addEventListener("fetch", (event) => {


    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3001/weatherpwa/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 