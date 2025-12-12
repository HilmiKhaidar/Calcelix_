// Calcetix Service Worker
// Beautiful calculator made simple - by Lunetix

const CACHE_NAME = 'calcetix-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/favicon.svg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Calcetix: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('Calcetix: All resources cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Calcetix: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('Calcetix: Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          console.log('Calcetix: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Calcetix: Fetching from network:', event.request.url);
        return fetch(event.request).then(function(response) {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(function() {
        // Fallback for offline scenarios
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background sync for future features
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('Calcetix: Background sync triggered');
    // Handle background sync if needed
  }
});

// Push notifications (for future features)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    console.log('Calcetix: Push notification received:', data);
    
    const options = {
      body: data.body || 'Calcetix notification',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1
      },
      actions: [
        {
          action: 'open',
          title: 'Open Calcetix',
          icon: '/favicon.svg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon.svg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Calcetix', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('Calcetix: Notification clicked:', event.notification.tag);
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle app installation
self.addEventListener('beforeinstallprompt', function(event) {
  console.log('Calcetix: App installation prompt available');
  // Store the event for later use
  self.deferredPrompt = event;
});

// Handle app installation completion
self.addEventListener('appinstalled', function(event) {
  console.log('Calcetix: App installed successfully');
  // Track installation analytics if needed
});