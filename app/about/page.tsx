export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            À propos de Siloha Church
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Bienvenue à l'Église Siloha, une communauté chrétienne chaleureuse et accueillante 
              située au cœur de la ville. Fondée sur les principes bibliques, notre église s'engage 
              à partager l'amour de Jésus-Christ et à servir notre communauté.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-gray-600 mb-6">
              Notre mission est de conduire les gens dans une relation grandissante avec Jésus-Christ 
              à travers l'adoration, l'enseignement biblique, la communion fraternelle et le service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos Valeurs</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>L'autorité de la Bible comme Parole de Dieu</li>
              <li>La prière comme fondement de notre relation avec Dieu</li>
              <li>L'évangélisation et le discipolat</li>
              <li>La communion fraternelle et le soutien mutuel</li>
              <li>Le service dans l'amour et l'humilité</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos Activités</h2>
            <p className="text-gray-600 mb-4">
              Nous proposons diverses activités pour tous les âges :
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Culte dominical à 12h00</li>
              <li>Étude biblique en semaine</li>
              <li>Cultes de priere et intercession</li>
              <li>Activités jeunesse et enfants</li>
              <li>Actions sociales et humanitaires</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}