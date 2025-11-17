import { notFound } from 'next/navigation';
import { getVideoDetails, getChannelVideos } from '@/lib/youtube-api';
import VideoPlayer from '@/components/youtube/VideoPlayer';
import VideoList from '@/components/youtube/VideoList';
import { decodeHtmlEntitiesServer } from '@/lib/utils';

interface SermonPageProps {
  params: {
    id: string;
  };
}

export default async function SermonPage({ params }: SermonPageProps) {
  // Récupérer les données de la vidéo
  const video = await getVideoDetails(params.id);
  const relatedVideos = await getChannelVideos(6);

  // Vérifier si la vidéo existe
  if (!video) {
    console.log('❌ Vidéo non trouvée pour ID:', params.id);
    notFound();
  }

  // Vérifier la structure des données
  console.log('📹 Données vidéo reçues:', video);

  const { snippet, statistics } = video;
  
  if (!snippet) {
    console.log('❌ Données snippet manquantes');
    notFound();
  }

  // Décoder le titre et la description
  const decodedTitle = decodeHtmlEntitiesServer(snippet.title);
  const decodedDescription = decodeHtmlEntitiesServer(snippet.description || '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vidéo principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoPlayer videoId={params.id} />
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {decodedTitle}
                </h1>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{snippet.channelTitle}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(snippet.publishedAt).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  {statistics && (
                    <div className="text-right text-sm text-gray-600">
                      <p>{parseInt(statistics.viewCount || '0').toLocaleString()} vues</p>
                      <p>{parseInt(statistics.likeCount || '0').toLocaleString()} likes</p>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {decodedDescription || 'Aucune description disponible.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vidéos connexes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Autres sermons
              </h2>
              <VideoList videos={relatedVideos.filter(v => v.id.videoId !== params.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}