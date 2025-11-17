import { getChannelVideos, getChannelDetails } from './youtube-api';

async function testYouTube() {
  console.log('🧪 Test de connexion YouTube API...');
  
  try {
    const videos = await getChannelVideos(3);
    const channel = await getChannelDetails();
    
    console.log('✅ Connexion réussie !');
    console.log(`📺 Chaîne: ${channel?.snippet?.title}`);
    console.log(`🎥 Vidéos récupérées: ${videos.length}`);
    
    videos.forEach((video, index) => {
      console.log(`${index + 1}. ${video.snippet.title}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
    return false;
  }
}

// Exécuter le test
testYouTube();