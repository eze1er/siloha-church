import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Événements
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez nos prochains événements et activités
          </p>
        </div>

        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Calendrier en cours de développement</h2>
            <p className="text-gray-600 mb-6">
              La gestion des événements et le calendrier seront bientôt disponibles.
            </p>
            <Link href="/" className="btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}