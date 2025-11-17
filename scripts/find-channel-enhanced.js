const axios = require('axios');

const RAPIDAPI_KEY = '3e0dd86e83mshfd00507d24fcab4p1fbfa8jsn1ec1f1c8d228';

async function findChannelEnhanced(username) {
  const options = {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  console.log(`🔍 Recherche avancée pour: ${username}`);
  
  try {
    // Essai 1: Recherche par nom d'utilisateur (sans @)
    console.log('\n1. Essai avec recherche par nom d\'utilisateur...');
    const searchResponse = await axios.get(
      `https://youtube-v31.p.rapidapi.com/search?q=${encodeURIComponent(username)}&part=snippet&type=channel&maxResults=5`,
      options
    );

    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log('✅ Chaînes trouvées par recherche:');
      searchResponse.data.items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.snippet.channelTitle} - ID: ${item.snippet.channelId}`);
      });
      
      // Prendre le premier résultat
      const channelId = searchResponse.data.items[0].snippet.channelId;
      console.log(`\n🎯 Channel ID principal: ${channelId}`);
      console.log('\n📋 Ajoutez à votre .env.local:');
      console.log(`YOUTUBE_CHANNEL_ID=${channelId}`);
      return channelId;
    }

    // Essai 2: Recherche directe par forUsername (sans @)
    console.log('\n2. Essai avec recherche directe...');
    const cleanUsername = username.replace('@', '');
    const channelResponse = await axios.get(
      `https://youtube-v31.p.rapidapi.com/channels?part=snippet&forUsername=${cleanUsername}`,
      options
    );

    if (channelResponse.data.items && channelResponse.data.items.length > 0) {
      const channelId = channelResponse.data.items[0].id;
      console.log('✅ Channel ID trouvé !');
      console.log(`📺 Channel ID: ${channelId}`);
      console.log('\n📋 Ajoutez à votre .env.local:');
      console.log(`YOUTUBE_CHANNEL_ID=${channelId}`);
      return channelId;
    }

    console.log('❌ Aucune chaîne trouvée avec les méthodes automatiques');
    console.log('\n💡 Essayez ces alternatives:');
    console.log('1. Allez sur votre chaîne YouTube');
    console.log('2. Regardez l\'URL dans la barre d\'adresse');
    console.log('3. Cherchez la partie qui commence par UC...');
    console.log('4. Exemple: youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxxx');

    return null;

  } catch (error) {
    console.log('❌ Erreur:', error.response?.data?.message || error.message);
    return null;
  }
}

const username = process.argv[2];
if (!username) {
  console.log('❌ Usage: node scripts/find-channel-enhanced.js <username>');
  console.log('💡 Exemple: node scripts/find-channel-enhanced.js ezekielwindowstv9755');
  process.exit(1);
}

findChannelEnhanced(username);