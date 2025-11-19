import { getChannelVideos } from '@/lib/youtube-api';
import Videos from '@/components/youtube/Videos';
import SearchBar from '@/components/common/SearchBar';

interface SermonsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SermonsPage({ searchParams }: SermonsPageProps) {
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const videos = await getChannelVideos(18); // Récupérer plus de vidéos pour la recherche

  // Filtrer les vidéos basé sur la recherche
  const filteredVideos = search
    ? videos.filter(video =>
        video.snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        video.snippet.description.toLowerCase().includes(search.toLowerCase())
      )
    : videos;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sermons
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos prédications passées et grandissez dans votre foi
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar placeholder="Rechercher un sermon..." />
        </div>

        {/* Videos Grid */}
        <Videos 
          videos={filteredVideos} 
          title={search ? `Résultats pour "${search}"` : "Derniers sermons"}
        />
      </div>
    </div>
  );
}