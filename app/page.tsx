import Link from 'next/link';
import { getChannelVideos } from '@/lib/youtube-api'; // Supprimez getChannelDetails
import Videos from '@/components/youtube/Videos';

export default async function HomePage() {
  const videos = await getChannelVideos(8); // Récupérer 6 dernières vidéos

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue à l'Église Siloe
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Une communauté de foi, d'espérance et d'amour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Découvrir notre église
            </Link>
            <Link href="/sermons" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              Voir les sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sermons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Derniers Sermons
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos dernières prédications
            </p>
          </div>
          
          <Videos videos={videos} title="" />
          
          <div className="text-center mt-8">
            <Link href="/sermons" className="btn-primary">
              Voir tous les sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sermons Inspirants</h3>
              <p className="text-gray-600">
                Découvrez nos messages hebdomadaires pour nourrir votre foi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Événements Communautaires</h3>
              <p className="text-gray-600">
                Participez à nos activités et renforcez les liens fraternels
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Soutien Mutuel</h3>
              <p className="text-gray-600">
                Ensemble, nous grandissons dans la foi et le service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Venez découvrir une communauté chaleureuse et accueillante
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Nous contacter
            </Link>
            <Link href="/donate" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
              Faire un don
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}