// YouTube's "UULF" playlist of a channel holds its long videos only, without Shorts.
const LONG_VIDEOS_PLAYLIST_ID = "UULFbswaXPWYb_ZZwmOs33jFWA";
const PLAYLIST_ITEMS_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const VIDEOS_NEEDED = 6;

const toVideo = ({ snippet, contentDetails }) => ({
  id: contentDetails.videoId,
  title: snippet.title,
  publishedAt: contentDetails.videoPublishedAt,
  url: `https://www.youtube.com/watch?v=${contentDetails.videoId}`,
});

// Runs on the server only, so the API key never reaches the browser.
export const getLongVideos = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not set. Add it to .env or the Vercel project settings.");
  }

  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    playlistId: LONG_VIDEOS_PLAYLIST_ID,
    maxResults: String(VIDEOS_NEEDED),
    key: apiKey,
  });
  const response = await fetch(`${PLAYLIST_ITEMS_URL}?${params}`);
  const body = await response.json();

  // The request URL contains the key, so errors name the playlist instead.
  if (!response.ok) {
    throw new Error(
      `YouTube API returned ${response.status} for playlist ${LONG_VIDEOS_PLAYLIST_ID}: ${body.error?.message}`,
    );
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw new Error(`YouTube API returned no videos for playlist ${LONG_VIDEOS_PLAYLIST_ID}`);
  }

  return body.items.map(toVideo);
};
