// YouTube URL からembed用のIDを抽出する関数
export function getYouTubeVideoId(url: string): string | null {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const regex of regexes) {
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

// URLがYouTube URLかどうかを判定
export function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}

// YouTube embed URLを生成
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

// Twitter/X URL検出
export function isTwitterUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/.test(url);
}

// Instagram URL検出
export function isInstagramUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[\w-]+/.test(url);
}

// Facebook URL検出
export function isFacebookUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?facebook\.com\/[\w.-]+\/(posts|videos)\/\d+/.test(url);
}

// ソーシャルメディアURL検出
export function getSocialMediaType(url: string): 'twitter' | 'instagram' | 'facebook' | 'youtube' | null {
  if (isYouTubeUrl(url)) return 'youtube';
  if (isTwitterUrl(url)) return 'twitter';
  if (isInstagramUrl(url)) return 'instagram';
  if (isFacebookUrl(url)) return 'facebook';
  return null;
}

// Twitter埋め込み用のID抽出
export function getTwitterTweetId(url: string): string | null {
  const match = url.match(/\/status\/(\d+)/);
  return match ? match[1] : null;
}

// Instagram埋め込み用のID抽出
export function getInstagramPostId(url: string): string | null {
  const match = url.match(/\/(p|reel)\/([\w-]+)/);
  return match ? match[2] : null;
}