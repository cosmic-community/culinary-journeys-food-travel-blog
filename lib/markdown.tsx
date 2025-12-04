import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-lg leading-relaxed mb-4 text-gray-700">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-lg leading-relaxed">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-gray-700">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary hover:text-secondary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}