"use client";

import { useState } from "react";
import StripeDonation from "@/components/donate/StripeDonation";
import PaymentMethods from "@/components/donate/PaymentMethods";

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(50);
  const [isRecurring, setIsRecurring] = useState(false);

  const presetAmounts = [20, 50, 100, 200, 500];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Faire un don
          </h1>
          <p className="text-lg text-gray-600">
            Votre générosité nous aide à poursuivre notre mission et à toucher
            des vies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">Montant du don</h2>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choisissez un montant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`p-3 border rounded-lg text-center font-semibold transition-colors ${
                        amount === preset
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {preset} CN$
                    </button>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="customAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ou saisissez un montant personnalisé
                  </label>
                  <input
                    type="number"
                    id="customAmount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Saisissez le montant"
                  />
                </div>
              </div>

              {/* Recurring Donation */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Faire de ce don un don mensuel récurrent
                  </span>
                </label>
              </div>

              {/* Payment Methods */}
              <PaymentMethods amount={amount} isRecurring={isRecurring} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-primary text-primary-600">
              <h3 className="text-xl font-semibold mb-4">
                Votre don fait la différence
              </h3>
              <ul className="space-y-3 text-primary-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Soutien aux programmes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aide aux familles et personnes dans le besoin</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Entretien de nos locaux</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Missions locales et internationales</span>
                </li>
              </ul>
            </div>

            <div className="card mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Autres moyens de donner
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Virement interact:</strong>
                  <br />
                  email: e-w-tv@bell.net
                </p>
                <p>
                  <strong>Chèque:</strong>
                  <br />À l'ordre de "Eglise Siloe/ Siloha Church"
                </p>
                <p>
                  <strong>Espèces:</strong>
                  <br />
                  Lors des differents cultes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
