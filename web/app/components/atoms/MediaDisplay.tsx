import { useState } from "react";
import { isYouTubeUrl, getYouTubeEmbedUrl } from "~/utils/media";

interface MediaDisplayProps {
  url?: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export function MediaDisplay({ url, alt, className = "", fallbackIcon }: MediaDisplayProps) {
  const [imageError, setImageError] = useState(false);

  if (!url) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-4xl">
          {fallbackIcon || '📷'}
        </div>
      </div>
    );
  }

  if (isYouTubeUrl(url)) {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (embedUrl) {
      return (
        <div className={className}>
          <iframe
            src={embedUrl}
            title={alt}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
  }

  // 画像の読み込みエラーが発生した場合はフォールバックを表示
  if (imageError) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-4xl">
          {fallbackIcon || '📷'}
        </div>
      </div>
    );
  }

  // 通常の画像として表示
  return (
    <div className={`bg-gray-200 ${className}`}>
      <img 
        src={url} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}