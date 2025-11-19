import axios from "axios";
import { CacheService } from './cache';
import { SimpleCache } from './simple-cache';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const BASE_URL = "https://www.googleapis.com/youtube/v3";

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

// Récupérer les vidéos de la chaîne avec pagination
export async function getChannelVideos(maxResults: number = 50): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn("⚠️ Configuration YouTube manquante");
    return [];
  }

  const cacheKey = `youtube:videos:${YOUTUBE_CHANNEL_ID}:${maxResults}`;

  try {
    // 🔥 ESSAYER LE CACHE D'ABORD
    const cached = SimpleCache.get<YouTubeVideo[]>(cacheKey);
    if (cached) {
      console.log('✅ Vidéos récupérées du cache (mémoire)');
      return cached;
    }

    console.log("🔍 Récupération des vidéos depuis YouTube API");

    const { data } = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: 'snippet,id',
        order: 'date',
        type: 'video',
        maxResults: maxResults
      }
    });

    const videos = data.items || [];
    console.log(`✅ ${videos.length} vidéos trouvées`);

    // 🔥 METTRE EN CACHE POUR 1 HEURE
    SimpleCache.set(cacheKey, videos, 3600);
    
    return videos;
  } catch (error: any) {
    console.error("❌ Erreur YouTube API:", error.response?.data);
    
    // En cas d'erreur, essayer le cache comme fallback
    const cached = SimpleCache.get<YouTubeVideo[]>(cacheKey);
    if (cached) {
      console.log('🔄 Utilisation du cache en fallback');
      return cached;
    }
    
    return [];
  }
}

// Fonction avec pagination
export async function getChannelVideosPaginated(
  maxResults: number = 18,
  pageToken?: string
): Promise<{
  videos: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  totalResults?: number;
}> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn("⚠️ Configuration YouTube manquante");
    return { videos: [] };
  }

  const cacheKey = `youtube:videos:${YOUTUBE_CHANNEL_ID}:${maxResults}:${pageToken || 'first'}`;

  try {
    // 🔥 ESSAYER LE CACHE D'ABORD
    const cached = SimpleCache.get<{
      videos: YouTubeVideo[];
      nextPageToken?: string;
      prevPageToken?: string;
      totalResults?: number;
    }>(cacheKey);
    
    if (cached) {
      console.log('✅ Vidéos paginées récupérées du cache');
      return cached;
    }

    console.log("🔍 Récupération des vidéos paginées depuis YouTube API");

    const params: any = {
      key: YOUTUBE_API_KEY,
      channelId: YOUTUBE_CHANNEL_ID,
      part: 'snippet,id',
      order: 'date',
      type: 'video',
      maxResults: maxResults
    };

    if (pageToken) {
      params.pageToken = pageToken;
    }

    const { data } = await axios.get(`${BASE_URL}/search`, { params });

    const result = {
      videos: data.items || [],
      nextPageToken: data.nextPageToken,
      prevPageToken: pageToken, // Pour la navigation simple
      totalResults: data.pageInfo?.totalResults
    };

    console.log(`✅ ${result.videos.length} vidéos trouvées, page suivante: ${result.nextPageToken ? 'Oui' : 'Non'}`);

    // 🔥 METTRE EN CACHE POUR 1 HEURE
    SimpleCache.set(cacheKey, result, 3600);
    
    return result;
  } catch (error: any) {
    console.error("❌ Erreur YouTube API paginée:", error.response?.data);
    
    // En cas d'erreur, essayer le cache comme fallback
    const cached = SimpleCache.get<any>(cacheKey);
    if (cached) {
      console.log('🔄 Utilisation du cache paginé en fallback');
      return cached;
    }
    
    return { videos: [] };
  }
}

// 🔥 FONCTION DE RECHERCHE PAGINÉE AVEC CACHE
export async function searchVideosPaginated(
  query: string,
  maxResults: number = 18,
  pageToken?: string
): Promise<{
  videos: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  totalResults?: number;
}> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not configured");
    return { videos: [] };
  }

  const cacheKey = `youtube:search:${query}:${maxResults}:${pageToken || 'first'}`;

  try {
    // 🔥 CACHE pour la recherche (15 minutes)
    const cached = SimpleCache.get<{
      videos: YouTubeVideo[];
      nextPageToken?: string;
      prevPageToken?: string;
      totalResults?: number;
    }>(cacheKey);
    
    if (cached) {
      console.log('✅ Résultats de recherche récupérés du cache');
      return cached;
    }

    console.log("🔍 Recherche paginée depuis YouTube API:", query);

    const params: any = {
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      q: query,
      maxResults: maxResults,
      type: 'video',
      order: 'relevance'
    };

    if (pageToken) {
      params.pageToken = pageToken;
    }

    const { data } = await axios.get(`${BASE_URL}/search`, { params });

    const result = {
      videos: data.items || [],
      nextPageToken: data.nextPageToken,
      prevPageToken: pageToken,
      totalResults: data.pageInfo?.totalResults
    };

    console.log(`✅ ${result.videos.length} résultats de recherche trouvés`);

    // Cache plus court pour les recherches (15 minutes)
    SimpleCache.set(cacheKey, result, 900);
    
    return result;
  } catch (error: any) {
    console.error("❌ Erreur recherche YouTube API:", error.response?.data);
    
    // Fallback au cache
    const cached = SimpleCache.get<any>(cacheKey);
    if (cached) {
      console.log('🔄 Utilisation du cache de recherche en fallback');
      return cached;
    }
    
    return { videos: [] };
  }
}

// Récupérer les informations de la chaîne
export async function getChannelDetails() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn("Configuration manquante");
    return null;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/channels`, {
      params: {
        key: YOUTUBE_API_KEY,
        id: YOUTUBE_CHANNEL_ID,
        part: 'snippet,statistics'
      }
    });

    return data.items[0] || null;
  } catch (error: any) {
    console.error(
      "Erreur récupération chaîne:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Recherche de vidéos
export async function searchVideos(query: string, maxResults: number = 12) {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not configured");
    return [];
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        q: query,
        maxResults: maxResults,
        type: 'video'
      }
    });

    return data.items || [];
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
}

// Récupérer les détails d'une vidéo spécifique
export async function getVideoDetails(videoId: string) {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not configured');
    return null;
  }

  const cacheKey = `youtube:video:${videoId}`;

  try {
    // Cache first
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) {
      console.log('✅ Détails vidéo récupérés du cache');
      return cached;
    }

    console.log('🔍 Récupération des détails depuis YouTube API');
    
    const { data } = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,statistics',
        id: videoId
      }
    });

    const video = data.items && data.items.length > 0 ? data.items[0] : null;
    
    if (video) {
      // Cache pour 24 heures (les détails changent rarement)
      await CacheService.set(cacheKey, video, 24 * 3600);
    }

    return video;
  } catch (error: any) {
    console.error('❌ Erreur récupération détails vidéo:', error.response?.data);
    
    const cached = await CacheService.get<any>(cacheKey);
    return cached || null;
  }
}
