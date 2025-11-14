"use client";

import { useState } from "react";
import StripeDonation from "./StripeDonation";

interface PaymentMethodsProps {
  amount: number;
  isRecurring: boolean;
}

export default function PaymentMethods({
  amount,
  isRecurring,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "stripe" | "paypal" | "bank"
  >("stripe");

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Méthode de paiement
        </label>
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => setSelectedMethod("stripe")}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedMethod === "stripe"
                ? "border-primary bg-primary-50"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${
                  selectedMethod === "stripe"
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedMethod === "stripe" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <span className="font-semibold">Carte de crédit/débit</span>
                <p className="text-sm text-gray-600 mt-1">
                  Paiement sécurisé via Stripe
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod("paypal")}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedMethod === "paypal"
                ? "border-primary bg-primary-50"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${
                  selectedMethod === "paypal"
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedMethod === "paypal" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <span className="font-semibold">PayPal</span>
                <p className="text-sm text-gray-600 mt-1">
                  Paiement via votre compte PayPal
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod("bank")}
            className={`p-4 border rounded-lg text-left transition-colors ${
              selectedMethod === "bank"
                ? "border-primary bg-primary-50"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded-full mr-3 flex items-center justify-center ${
                  selectedMethod === "bank"
                    ? "border-primary bg-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedMethod === "bank" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <span className="font-semibold">Virement bancaire</span>
                <p className="text-sm text-gray-600 mt-1">
                  Instructions pour virement manuel
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <div>
        {selectedMethod === "stripe" && (
          <StripeDonation amount={amount} isRecurring={isRecurring} />
        )}

        {selectedMethod === "paypal" && (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600 mb-4">
              Redirection vers PayPal pour compléter votre don de {amount} CN$
            </p>
            <button
              type="button"
              className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              disabled
            >
              Payer avec PayPal (Bientôt disponible)
            </button>
          </div>
        )}

        {selectedMethod === "bank" && (
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-4">
              Instructions pour virement bancaire
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Bénéficiaire:</strong> Siloha Church
              </p>
              <p>
                <strong>IBAN:</strong> FR76 3000 4000 5000 6000 7000 800
              </p>
              <p>
                <strong>BIC:</strong> BNP AFR PP XXX
              </p>
              <p>
                <strong>Montant:</strong> {amount} CN$
              </p>
              <p>
                <strong>Communication:</strong> Don{" "}
                {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Merci de nous envoyer un email à donations@siloha-church.org après
              avoir effectué le virement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
