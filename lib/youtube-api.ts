import axios from "axios";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

// Récupérer les vidéos de la chaîne
export async function getChannelVideos(
  maxResults: number = 12
): Promise<YouTubeVideo[]> {
  if (!RAPIDAPI_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn("⚠️ Configuration YouTube manquante");
    console.warn("RAPIDAPI_KEY:", RAPIDAPI_KEY ? "✅" : "❌");
    console.warn("YOUTUBE_CHANNEL_ID:", YOUTUBE_CHANNEL_ID ? "✅" : "❌");
    return [];
  }

  try {
    console.log("🔍 Récupération des vidéos pour:", YOUTUBE_CHANNEL_ID);

    const { data } = await axios.get(
      `${BASE_URL}/search?channelId=${YOUTUBE_CHANNEL_ID}&part=snippet%2Cid&order=date&maxResults=${maxResults}`,
      options
    );

    console.log(`✅ ${data.items?.length || 0} vidéos trouvées`);
    return data.items || [];
  } catch (error: any) {
    console.error(
      "❌ Erreur YouTube API:",
      error.response?.data || error.message
    );
    return [];
  }
}

// Récupérer les informations de la chaîne
export async function getChannelDetails() {
  if (!RAPIDAPI_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn("Configuration manquante");
    return null;
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}`,
      options
    );

    return data.items[0] || null;
  } catch (error: any) {
    console.error(
      "Erreur récupération chaîne:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function searchVideos(query: string, maxResults: number = 12) {
  if (!RAPIDAPI_KEY) {
    console.warn("RapidAPI key not configured");
    return [];
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
        query
      )}&maxResults=${maxResults}`,
      options
    );

    return data.items || [];
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
}

// Récupérer les détails d'une vidéo spécifique
export async function getVideoDetails(videoId: string) {
  if (!RAPIDAPI_KEY) {
    console.warn('RapidAPI key not configured');
    return null;
  }

  try {
    console.log('🔍 Récupération des détails pour videoId:', videoId);
    
    const { data } = await axios.get(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}`,
      options
    );

    console.log('✅ Données détaillées reçues:', data.items?.length, 'éléments');
    
    if (data.items && data.items.length > 0) {
      return data.items[0];
    } else {
      console.log('❌ Aucune vidéo trouvée avec cet ID');
      return null;
    }
  } catch (error: any) {
    console.error('❌ Erreur récupération détails vidéo:', error.response?.data || error.message);
    return null;
  }
}