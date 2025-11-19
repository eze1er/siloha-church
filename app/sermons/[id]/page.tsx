import { notFound } from 'next/navigation';
import { getChannelVideos } from '@/lib/youtube-api';
import VideoPlayer from '@/components/youtube/VideoPlayer';
import VideoList from '@/components/youtube/VideoList';
import { decodeHtmlEntitiesServer } from '@/lib/utils';

interface SermonPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 86400;
export default async function SermonDetailPage({ params }: SermonPageProps) {
  console.log('🎯 Page détail chargée pour ID:', params.id);
  
  // Récupérer toutes les vidéos pour trouver celle qui correspond
  const allVideos = await getChannelVideos(50);
  const video = allVideos.find(v => v.id.videoId === params.id);
  const relatedVideos = allVideos.filter(v => v.id.videoId !== params.id).slice(0, 6);

  // Vérifier si la vidéo existe
  if (!video) {
    console.log('❌ Vidéo non trouvée:', params.id);
    notFound();
  }

  const { snippet } = video;
  const decodedTitle = decodeHtmlEntitiesServer(snippet.title);
  const decodedDescription = decodeHtmlEntitiesServer(snippet.description || '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Détail du Sermon</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vidéo principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoPlayer videoId={params.id} title={decodedTitle} />
              
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
              <VideoList videos={relatedVideos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}