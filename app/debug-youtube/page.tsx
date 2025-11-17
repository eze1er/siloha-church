import { getChannelVideos } from '@/lib/youtube-api';

export default async function DebugYouTubePage() {
  const videos = await getChannelVideos(50);
  
  console.log('📺 Vidéos récupérées:', videos.length);
  videos.forEach((video, index) => {
    console.log(`${index + 1}. ${video.snippet.title}`);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Debug YouTube Integration
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">Vidéos trouvées</p>
              <p className="text-2xl font-bold text-green-900">{videos.length}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">Channel ID</p>
              <p className="text-lg font-mono text-blue-900">{process.env.YOUTUBE_CHANNEL_ID}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800">API Key</p>
              <p className="text-lg font-mono text-purple-900">
                {process.env.RAPIDAPI_KEY ? '✅ Configurée' : '❌ Manquante'}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des vidéos en format brut */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Vidéos récupérées ({videos.length})</h2>
          
          {videos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-red-600 text-lg">❌ Aucune vidéo récupérée</p>
              <p className="text-gray-600 mt-2">Vérifiez votre configuration API</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video, index) => (
                <div key={video.id.videoId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    <img 
                      src={video.snippet.thumbnails.high.url} 
                      alt={video.snippet.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{video.snippet.title}</h3>
                      <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-xs font-mono mt-1">ID: {video.id.videoId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}