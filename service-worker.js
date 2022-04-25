// documented by Neeraj Gupta - https://neerajgupta.codes
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  //   event.waitUntil will wait until innermost event is resolved
  // waitUntil will prevent the browser to terminate the service worker process before promise is resolved
  // read about waitUntil here - https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
  event.waitUntil(
    //   Open cache(cacheName) from CacheStorage and if opened add all resourcesToPrecache in CacheStorage
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(resourcesToPrecache))
      .catch((err) => console.log("Faled to precache", err))
  );
});

self.addEventListener("activate", (event) => console.log("Activate event"));

// fetching files from either cache or network
self.addEventListener("fetch", (event) => {
  // respondWith will prevent browser to directly go and do fetch request instead provide user with power to do task manually depending on promise
  // read about respondWith here - https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request)) //returning cache or if not available fetching from event
  );
});

self.addEventListener("push", (event) => {
  const title = "Yes, a message";
  const body = "We have received a push message";
  const tag = "simple-push-example-tag";
  const options = {
    body: body,
    tag: tag,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Pre Caching resources

const cacheName = "cache-v1";
const resourcesToPrecache = [
  "/",
  "index.html",
  "style.css",
  "index.js",
  "package-lock.json",
  "title.png",
  "manifest.json",
  "f1.gif"
];