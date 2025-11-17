const axios = require('axios');

const RAPIDAPI_KEY = '3e0dd86e83mshfd00507d24fcab4p1fbfa8jsn1ec1f1c8d228';

async function findChannelId(username) {
  try {
    const options = {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    console.log(`🔍 Recherche du Channel ID pour: ${username}`);
    
    const response = await axios.get(
      `https://youtube-v31.p.rapidapi.com/channels?part=snippet&forUsername=${username}`,
      options
    );

    if (response.data.items && response.data.items.length > 0) {
      const channelId = response.data.items[0].id;
      console.log('✅ Channel ID trouvé !');
      console.log(`📺 Channel ID: ${channelId}`);
      console.log('\n📋 Ajoutez cette ligne à votre .env.local:');
      console.log(`YOUTUBE_CHANNEL_ID=${channelId}`);
      return channelId;
    } else {
      console.log('❌ Aucune chaîne trouvée avec ce nom d\'utilisateur');
      return null;
    }
  } catch (error) {
    console.log('❌ Erreur:', error.response?.data?.message || error.message);
    return null;
  }
}

// Utilisation: node scripts/find-channel-id.js SilohaChurch
const username = process.argv[2];
if (!username) {
  console.log('❌ Usage: node scripts/find-channel-id.js <username>');
  console.log('💡 Exemple: node scripts/find-channel-id.js SilohaChurch');
  process.exit(1);
}

findChannelId(username);