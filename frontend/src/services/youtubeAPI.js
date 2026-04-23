const API_KEY = "AIzaSyD3H9ehkKzgXEAHhgIM1RVy10sfN0TDRrg";
const CHANNEL_ID = "UCpKwJuxIRYgBpiSgkkn8H1w";

export async function getChannelData() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
  );

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  return data.items[0];
}