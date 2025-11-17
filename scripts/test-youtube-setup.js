const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '3e0dd86e83mshfd00507d24fcab4p1fbfa8jsn1ec1f1c8d228';
const CHANNEL_ID ='UC_-rI0d4c6AmGA_3p2-ls9w'

async function testYouTubeSetup() {
  console.log('🧪 Test de configuration YouTube...\n');
  
  // Test 1: Recherche de la chaîne
  console.log('1. Recherche de votre chaîne...');
  try {
    const searchResponse = await axios.get(
      `https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      }
    );

    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log('✅ Vidéos trouvées :', searchResponse.data.items.length);
      searchResponse.data.items.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.snippet.title}`);
      });
    } else {
      console.log('❌ Aucune vidéo trouvée avec ce Channel ID');
    }
  } catch (error) {
    console.log('❌ Erreur API :', error.response?.data?.message || error.message);
  }

  // Test 2: Informations de la chaîne
  console.log('\n2. Informations de la chaîne...');
  try {
    const channelResponse = await axios.get(
      `https://youtube-v31.p.rapidapi.com/channels?part=snippet&id=${CHANNEL_ID}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
        },
      }
    );

    if (channelResponse.data.items && channelResponse.data.items.length > 0) {
      console.log('✅ Chaîne trouvée :', channelResponse.data.items[0].snippet.title);
    } else {
      console.log('❌ Chaîne non trouvée');
    }
  } catch (error) {
    console.log('❌ Erreur :', error.response?.data?.message || error.message);
  }
}

// Exécution
if (!CHANNEL_ID) {
  console.log('❌ YOUTUBE_CHANNEL_ID non configuré');
  console.log('💡 Ajoutez-le à votre .env.local :');
  console.log('   YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx');
} else {
  testYouTubeSetup();
}