'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Connectez-vous pour accéder à votre profil
            </h1>
            <Link href="/login" className="btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <p className="mt-1 text-sm text-gray-600">
              Informations personnelles et préférences
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Adresse email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Rôle</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{user.role}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date().toLocaleDateString('fr-FR')}
                </dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex justify-end space-x-3">
              <button className="btn-secondary">
                Modifier le profil
              </button>
              <button className="btn-primary">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>

        {/* Section des activités */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Mes dons</h2>
            <p className="text-gray-600 text-sm">
              Historique de vos dons et soutiens à l'église
            </p>
            <div className="mt-4 text-center">
              <Link href="/donate" className="btn-primary text-sm">
                Faire un don
              </Link>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Mes participations</h2>
            <p className="text-gray-600 text-sm">
              Événements auxquels vous avez participé
            </p>
            <div className="mt-4 text-center">
              <Link href="/events" className="btn-primary text-sm">
                Voir les événements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}