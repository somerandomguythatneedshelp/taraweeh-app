/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

// Assets from the 'build' (Svelte/JS/CSS) and 'static' (images/favicons)
const ASSETS = [...build, ...files];

self.addEventListener('install', (event: any) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event: any) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event: any) => {
  if (event.request.method !== 'GET') return;

  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    // 1. Serve build/static assets from cache
    if (ASSETS.includes(url.pathname)) {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
    }

    // 2. Strategy: Network First, falling back to cache
    try {
      const response = await fetch(event.request);

      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch (err) {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      
      // Fallback if offline and not in cache
      return new Response('Offline: Content not available', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }

  event.respondWith(respond());
});