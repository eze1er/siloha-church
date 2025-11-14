'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Il y a un problème avec la configuration du serveur.';
      case 'AccessDenied':
        return 'Accès refusé.';
      case 'Verification':
        return 'Le token de vérification a expiré ou a déjà été utilisé.';
      case 'OAuthSignin':
        return 'Erreur lors de la configuration de la requête OAuth.';
      case 'OAuthCallback':
        return 'Erreur lors de la gestion de la réponse OAuth.';
      case 'OAuthCreateAccount':
        return 'Impossible de créer un compte OAuth.';
      case 'EmailCreateAccount':
        return 'Impossible de créer un compte email.';
      case 'Callback':
        return 'Erreur dans la route de callback.';
      case 'OAuthAccountNotLinked':
        return 'Cet email est déjà associé à un autre compte.';
      case 'EmailSignin':
        return 'Erreur lors de l\'envoi de l\'email de connexion.';
      case 'CredentialsSignin':
        return 'La connexion avec ces identifiants a échoué.';
      case 'SessionRequired':
        return 'Veuillez vous connecter pour accéder à cette page.';
      default:
        return 'Une erreur inconnue est survenue.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Erreur d'authentification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {getErrorMessage(error)}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Si le problème persiste, contactez l'administrateur.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Retour à la connexion
            </Link>
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Retour à l'accueil
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Code d'erreur :</strong> {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}