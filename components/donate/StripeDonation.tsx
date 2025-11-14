"use client";

import { useState } from "react";

interface StripeDonationProps {
  amount: number;
  isRecurring: boolean;
  onSuccess?: () => void;
}

export default function StripeDonation({
  amount,
  isRecurring,
  onSuccess,
}: StripeDonationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulation de paiement pour le moment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // En production, vous intégrerez Stripe ici
      console.log("Processing donation:", { amount, isRecurring });

      // Simuler un succès
      onSuccess?.();
    } catch (err) {
      setError("Erreur lors du traitement du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Informations de carte (Simulation)
        </label>
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Numéro de carte"
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/AA"
                className="p-2 border border-gray-300 rounded"
                disabled
              />
              <input
                type="text"
                placeholder="CVV"
                className="p-2 border border-gray-300 rounded"
                disabled
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Intégration Stripe en cours de configuration
          </p>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Traitement..." : `Simuler un don de ${amount}  CN$`}
      </button>

      <p className="text-sm text-gray-600 text-center">
        ⚠️ Cette fonctionnalité est en mode démonstration
      </p>
    </form>
  );
}
