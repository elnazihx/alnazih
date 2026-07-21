// Extracts the video ID from common YouTube URL formats:
//   https://www.youtube.com/watch?v=VIDEOID
//   https://youtu.be/VIDEOID
//   https://www.youtube.com/embed/VIDEOID
//   https://www.youtube.com/shorts/VIDEOID
// Returns null if the string doesn't look like a YouTube URL/ID.
export function extractYouTubeId(url){
  if(!url) return null;
  const trimmed = url.trim();

  // Already a bare video id (11 chars, typical YouTube id charset)
  if(/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for(const re of patterns){
    const m = trimmed.match(re);
    if(m) return m[1];
  }
  return null;
}
