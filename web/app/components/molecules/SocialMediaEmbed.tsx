import { getSocialMediaType, getYouTubeEmbedUrl, getTwitterTweetId, getInstagramPostId } from "~/utils/media";

interface SocialMediaEmbedProps {
  url: string;
}

export function SocialMediaEmbed({ url }: SocialMediaEmbedProps) {
  const mediaType = getSocialMediaType(url);

  switch (mediaType) {
    case 'youtube': {
      const embedUrl = getYouTubeEmbedUrl(url);
      if (embedUrl) {
        return (
          <div className="my-4">
            <div className="aspect-video w-full max-w-2xl mx-auto">
              <iframe
                src={embedUrl}
                title="YouTube video"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      }
      break;
    }

    case 'twitter': {
      const tweetId = getTwitterTweetId(url);
      if (tweetId) {
        return (
          <div className="my-4">
            <div className="max-w-2xl mx-auto">
              <blockquote className="twitter-tweet" data-dnt="true">
                <a href={url}>Tweet</a>
              </blockquote>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          </div>
        );
      }
      break;
    }

    case 'instagram': {
      const postId = getInstagramPostId(url);
      if (postId) {
        return (
          <div className="my-4">
            <div className="max-w-2xl mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url}>Instagram post</a>
              </blockquote>
              <script
                async
                src="//www.instagram.com/embed.js"
              ></script>
            </div>
          </div>
        );
      }
      break;
    }

    case 'facebook': {
      return (
        <div className="my-4">
          <div className="max-w-2xl mx-auto">
            <div
              className="fb-post"
              data-href={url}
              data-width="auto"
              data-show-text="true"
            >
              <blockquote cite={url} className="fb-xfbml-parse-ignore">
                <a href={url}>Facebook post</a>
              </blockquote>
            </div>
            <div id="fb-root"></div>
            <script
              async
              defer
              crossOrigin="anonymous"
              src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v18.0"
            ></script>
          </div>
        </div>
      );
    }

    default:
      // 通常のリンクとして表示
      return (
        <div className="my-4">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
          >
            🔗 {url}
          </a>
        </div>
      );
  }

  // フォールバック
  return (
    <div className="my-4">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
      >
        🔗 {url}
      </a>
    </div>
  );
}