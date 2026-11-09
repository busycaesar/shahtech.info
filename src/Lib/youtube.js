// YouTube's "UULF" playlist of a channel holds its long videos only, without Shorts.
const LONG_VIDEOS_FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=UULFbswaXPWYb_ZZwmOs33jFWA";
const VIDEOS_NEEDED = 6;

const decodeXmlEntities = (text) =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const readTag = (entry, tag) => {
  const match = entry.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  if (!match) throw new Error(`Missing <${tag}> in YouTube feed entry: ${entry}`);
  return decodeXmlEntities(match[1]);
};

const parseEntry = (entry) => {
  const id = readTag(entry, "yt:videoId");
  return {
    id,
    title: readTag(entry, "title"),
    publishedAt: readTag(entry, "published"),
    url: `https://www.youtube.com/watch?v=${id}`,
  };
};

// Runs on the server only: YouTube feeds do not allow browser requests.
export const getLongVideos = async () => {
  const response = await fetch(LONG_VIDEOS_FEED_URL);
  if (!response.ok) {
    throw new Error(
      `YouTube feed ${LONG_VIDEOS_FEED_URL} returned ${response.status}`,
    );
  }

  const feed = await response.text();
  const entries = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  if (entries.length === 0) {
    throw new Error(`No videos found in YouTube feed ${LONG_VIDEOS_FEED_URL}`);
  }

  return entries.slice(0, VIDEOS_NEEDED).map(([, entry]) => parseEntry(entry));
};
