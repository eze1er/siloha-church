import { getChannelVideos, getChannelDetails } from '@/lib/youtube-api';
import Videos from '@/components/youtube/Videos';

export default async function TestYouTubePage() {
  const [videos, channel] = await Promise.all([
    getChannelVideos(12),
    getChannelDetails()
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Test YouTube Integration
        </h1>
        
        {channel && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Informations de la chaîne</h2>
            <div className="flex items-center space-x-4">
              <img 
                src={channel.snippet.thumbnails.high.url} 
                alt={channel.snippet.title}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{channel.snippet.title}</h3>
                <p className="text-gray-600">{channel.snippet.description}</p>
                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                  <span>{parseInt(channel.statistics.subscriberCount).toLocaleString()} abonnés</span>
                  <span>{parseInt(channel.statistics.videoCount).toLocaleString()} vidéos</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Videos videos={videos} title={`Dernières vidéos (${videos.length})`} />
        
        {videos.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Aucune vidéo trouvée
              </h3>
              <p className="text-yellow-700">
                Vérifiez vos variables d'environnement YOUTUBE_API_KEY et YOUTUBE_CHANNEL_ID
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}