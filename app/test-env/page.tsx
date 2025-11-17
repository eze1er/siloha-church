export default function TestEnvPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Test Variables d'Environnement</h1>
          
          <div className="space-y-4">
            <div>
              <strong>RAPIDAPI_KEY:</strong> 
              <span className={process.env.RAPIDAPI_KEY ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                {process.env.RAPIDAPI_KEY ? '✅ Présente' : '❌ Manquante'}
              </span>
            </div>
            
            <div>
              <strong>YOUTUBE_CHANNEL_ID:</strong> 
              <span className={process.env.YOUTUBE_CHANNEL_ID ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                {process.env.YOUTUBE_CHANNEL_ID ? '✅ Présent' : '❌ Manquant'}
              </span>
              {process.env.YOUTUBE_CHANNEL_ID && (
                <p className="text-sm text-gray-600 mt-1 font-mono">{process.env.YOUTUBE_CHANNEL_ID}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}