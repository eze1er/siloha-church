import axios from "axios";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const options = {
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export async function findChannelId(username: string) {
  try {
    const { data } = await axios.get(
      `https://youtube-v31.p.rapidapi.com/channels?part=snippet&forUsername=${username}`,
      options
    );

    if (data.items && data.items.length > 0) {
      return data.items[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error finding channel ID:', error);
    return null;
  }
}

// Utilisation : 
// const channelId = await findChannelId('SilohaChurch');