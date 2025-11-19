class SimpleCache {
  private static cache = new Map<string, { data: any; expiry: number }>();
  private static readonly DEFAULT_TTL = 3600; // 1 heure en secondes

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Vérifier l'expiration
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  static set(key: string, value: any, ttl: number = this.DEFAULT_TTL): void {
    const expiry = Date.now() + (ttl * 1000);
    this.cache.set(key, { data: value, expiry });
  }

  static delete(key: string): void {
    this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  // Nettoyer les entrées expirées
  static cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Nettoyer toutes les heures
setInterval(() => SimpleCache.cleanup(), 60 * 60 * 1000);

export { SimpleCache };