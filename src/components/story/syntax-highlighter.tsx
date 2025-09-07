"use client";

import { useMemo } from "react";

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  className?: string;
  showLineNumbers?: boolean;
}

// Simple syntax highlighting patterns
const syntaxPatterns = {
  typescript: [
    { pattern: /\b(const|let|var|function|class|interface|type|export|import|from|as|extends|implements)\b/g, className: 'text-purple-400' },
    { pattern: /\b(string|number|boolean|object|any|void|null|undefined)\b/g, className: 'text-blue-400' },
    { pattern: /"[^"]*"/g, className: 'text-green-400' },
    { pattern: /'[^']*'/g, className: 'text-green-400' },
    { pattern: /`[^`]*`/g, className: 'text-green-400' },
    { pattern: /\/\/.*$/gm, className: 'text-gray-500' },
    { pattern: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500' },
    { pattern: /\b\d+\b/g, className: 'text-orange-400' },
  ],
  tsx: [
    { pattern: /\b(const|let|var|function|class|interface|type|export|import|from|as|extends|implements|return)\b/g, className: 'text-purple-400' },
    { pattern: /\b(string|number|boolean|object|any|void|null|undefined|React|JSX)\b/g, className: 'text-blue-400' },
    { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*[^>]*>/g, className: 'text-red-400' },
    { pattern: /\b[A-Z][a-zA-Z0-9]*(?=\s*[<(])/g, className: 'text-yellow-400' },
    { pattern: /"[^"]*"/g, className: 'text-green-400' },
    { pattern: /'[^']*'/g, className: 'text-green-400' },
    { pattern: /`[^`]*`/g, className: 'text-green-400' },
    { pattern: /\/\/.*$/gm, className: 'text-gray-500' },
    { pattern: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500' },
    { pattern: /\b\d+\b/g, className: 'text-orange-400' },
  ],
  javascript: [
    { pattern: /\b(const|let|var|function|class|export|import|from|as|extends|return)\b/g, className: 'text-purple-400' },
    { pattern: /\b(true|false|null|undefined)\b/g, className: 'text-blue-400' },
    { pattern: /"[^"]*"/g, className: 'text-green-400' },
    { pattern: /'[^']*'/g, className: 'text-green-400' },
    { pattern: /`[^`]*`/g, className: 'text-green-400' },
    { pattern: /\/\/.*$/gm, className: 'text-gray-500' },
    { pattern: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500' },
    { pattern: /\b\d+\b/g, className: 'text-orange-400' },
  ],
  bash: [
    { pattern: /^#.*$/gm, className: 'text-gray-500' },
    { pattern: /\b(npm|git|cd|ls|mkdir|rm|cp|mv|echo|cat|grep|find)\b/g, className: 'text-purple-400' },
    { pattern: /--?[a-zA-Z-]+/g, className: 'text-blue-400' },
    { pattern: /"[^"]*"/g, className: 'text-green-400' },
    { pattern: /'[^']*'/g, className: 'text-green-400' },
  ]
};

export function SyntaxHighlighter({
  code,
  language,
  className = "",
  showLineNumbers = true
}: SyntaxHighlighterProps) {
  const highlightedCode = useMemo(() => {
    const patterns = syntaxPatterns[language as keyof typeof syntaxPatterns] || [];
    let highlighted = code;
    
    // Apply syntax highlighting patterns
    patterns.forEach(({ pattern, className: patternClass }) => {
      highlighted = highlighted.replace(pattern, (match) => 
        `<span class="${patternClass}">${match}</span>`
      );
    });
    
    return highlighted;
  }, [code, language]);

  const lines = code.split('\n');

  return (
    <div className={`relative ${className}`}>
      <pre className="bg-gray-950 rounded-lg overflow-x-auto">
        <code
          className={`language-${language} block p-4 text-sm text-gray-300 font-mono`}
          style={{ 
            background: 'transparent',
            ...(showLineNumbers && { paddingLeft: '3rem' })
          }}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        {showLineNumbers && (
          <div className="absolute left-0 top-0 p-4 text-gray-500 text-sm font-mono select-none pointer-events-none">
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        )}
      </pre>
    </div>
  );
}