'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FindChannelIdPage() {
  const [username, setUsername] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const findChannelId = async () => {
    if (!username) {
      setError('Veuillez entrer un nom d\'utilisateur YouTube');
      return;
    }

    setIsLoading(true);
    setError('');
    setChannelId('');

    try {
      const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '3e0dd86e83mshfd00507d24fcab4p1fbfa8jsn1ec1f1c8d228';
      
      const options = {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      };

      const { data } = await axios.get(
        `https://youtube-v31.p.rapidapi.com/channels?part=snippet&forUsername=${username}`,
        options
      );

      if (data.items && data.items.length > 0) {
        setChannelId(data.items[0].id);
      } else {
        setError('Aucune chaîne trouvée avec ce nom d\'utilisateur');
      }
    } catch (err: any) {
      setError('Erreur: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Trouver votre Channel ID YouTube
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur YouTube (sans @)
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: SilohaChurch"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
              <p className="text-sm text-gray-500 mt-1">
                C'est le nom après le @ dans l'URL : youtube.com/@<strong>SilohaChurch</strong>
              </p>
            </div>

            <button
              onClick={findChannelId}
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {isLoading ? 'Recherche en cours...' : 'Trouver Channel ID'}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {channelId && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                <p className="font-semibold">Channel ID trouvé !</p>
                <p className="mt-2 font-mono">{channelId}</p>
                <p className="text-sm mt-2">
                  Ajoutez cette ligne à votre <code>.env.local</code> :
                </p>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-sm">
                  YOUTUBE_CHANNEL_ID={channelId}
                </code>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions :</h3>
            <ol className="list-decimal list-inside text-blue-800 space-y-1 text-sm">
              <li>Entrez votre nom d'utilisateur YouTube (sans le @)</li>
              <li>Cliquez sur "Trouver Channel ID"</li>
              <li>Copiez le Channel ID affiché</li>
              <li>Ajoutez-le à votre fichier .env.local</li>
              <li>Redémarrez l'application</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}