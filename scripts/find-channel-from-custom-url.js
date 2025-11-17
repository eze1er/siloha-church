const axios = require('axios');

const RAPIDAPI_KEY = '3e0dd86e83mshfd00507d24fcab4p1fbfa8jsn1ec1f1c8d228';

async function findChannelFromCustomUrl() {
  const options = {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  console.log('🔍 Recherche du Channel ID pour @ezekielwindowstv9755...');
  
  try {
    // Méthode 1: Recherche par le nom personnalisé
    const searchResponse = await axios.get(
      `https://youtube-v31.p.rapidapi.com/search?q=ezekielwindowstv9755&part=snippet&type=channel&maxResults=10`,
      options
    );

    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log('✅ Chaînes trouvées:');
      searchResponse.data.items.forEach((item, index) => {
        const channelTitle = item.snippet.channelTitle;
        const channelId = item.snippet.channelId;
        console.log(`${index + 1}. "${channelTitle}" - ID: ${channelId}`);
      });
      
      // Prendre le résultat le plus probable
      const mostLikely = searchResponse.data.items[0];
      console.log(`\n🎯 Channel ID le plus probable: ${mostLikely.snippet.channelId}`);
      console.log(`📺 Nom de la chaîne: ${mostLikely.snippet.channelTitle}`);
      console.log('\n📋 Ajoutez à votre .env.local:');
      console.log(`YOUTUBE_CHANNEL_ID=${mostLikely.snippet.channelId}`);
      
      return mostLikely.snippet.channelId;
    }

    console.log('❌ Aucune chaîne trouvée avec la recherche');
    return null;

  } catch (error) {
    console.log('❌ Erreur:', error.response?.data?.message || error.message);
    return null;
  }
}

findChannelFromCustomUrl();