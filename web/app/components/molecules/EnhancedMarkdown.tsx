import ReactMarkdown from 'react-markdown';
import { getSocialMediaType } from '~/utils/media';
import { SocialMediaEmbed } from './SocialMediaEmbed';

interface EnhancedMarkdownProps {
  children: string;
  className?: string;
}

// URLを検出してソーシャルメディア埋め込みに変換するカスタムコンポーネント
function LinkRenderer({ href, children, ...props }: any) {
  if (!href) return <a>{children}</a>;

  const mediaType = getSocialMediaType(href);
  
  // ソーシャルメディアURLの場合は埋め込み表示
  if (mediaType) {
    return <SocialMediaEmbed url={href} />;
  }

  // 通常のリンク
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      {children}
    </a>
  );
}

// テキスト内のURLを自動検出してリンク化する関数
function processTextWithUrls(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    const mediaType = getSocialMediaType(url);
    if (mediaType) {
      // ソーシャルメディアURLの場合はMarkdownリンク形式に変換
      return `[${url}](${url})`;
    }
    return `[${url}](${url})`;
  });
}

export function EnhancedMarkdown({ children, className = "" }: EnhancedMarkdownProps) {
  // URLを自動検出してMarkdown形式に変換
  const processedContent = processTextWithUrls(children);

  return (
    <div className={className}>
      <ReactMarkdown 
        components={{
        a: LinkRenderer,
        // その他のカスタムコンポーネント
        p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
        h1: ({ children }) => <h1 className="text-2xl font-bold mb-3">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-700">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>;
          }
          return <code className="block bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">{children}</code>;
        }
      }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}