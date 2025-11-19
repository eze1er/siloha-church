// lib/quota-tracker.ts
let dailyRequests = 0;
const resetTime = 24 * 60 * 60 * 1000; // 24 heures

export class QuotaTracker {
  static increment() {
    dailyRequests++;
    
    // Réinitialiser le compteur toutes les 24h
    setTimeout(() => {
      dailyRequests = 0;
    }, resetTime);
  }

  static getRemainingQuota() {
    const usedUnits = dailyRequests * 100; // Chaque requête = 100 unités
    return Math.max(0, 10000 - usedUnits);
  }

  static getUsagePercentage() {
    return (dailyRequests * 100) / 100; // 100 requêtes max par jour
  }
}

// Dans youtube-api.ts, ajoutez :
QuotaTracker.increment();
console.log(`📊 Quota restant: ${QuotaTracker.getRemainingQuota()} unités`);