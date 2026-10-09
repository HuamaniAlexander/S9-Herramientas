const preloadedCache = new Set<string>();

export function preloadImages(urls: string[]): Promise<void[]> {
  if (typeof window === 'undefined') return Promise.resolve([]);

  const promises = urls.map((url) => {
    if (!url || preloadedCache.has(url)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = url;
      img.decoding = 'async';
      img.onload = () => {
        preloadedCache.add(url);
        resolve();
      };
      img.onerror = () => {
        // Resolve anyway so Promise.all never hangs
        resolve();
      };
    });
  });

  return Promise.all(promises);
}

export function isImageCached(url: string): boolean {
  return preloadedCache.has(url);
}
