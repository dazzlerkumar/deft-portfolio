import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Storytelling Portfolio';
    const description = searchParams.get('description') || 'An immersive journey through the career of a lead frontend engineer';
    const chapter = searchParams.get('chapter');
    
    // Define chapter-specific colors
    const chapterColors = {
      '1': { primary: '#f97316', secondary: '#fb923c', background: '#fff7ed' },
      '2': { primary: '#3b82f6', secondary: '#60a5fa', background: '#eff6ff' },
      '3': { primary: '#8b5cf6', secondary: '#a78bfa', background: '#f5f3ff' },
      '4': { primary: '#1f2937', secondary: '#374151', background: '#f9fafb' },
      epilogue: { primary: '#059669', secondary: '#10b981', background: '#ecfdf5' },
    };
    
    const colors = chapter && chapterColors[chapter as keyof typeof chapterColors] 
      ? chapterColors[chapter as keyof typeof chapterColors]
      : { primary: '#1f2937', secondary: '#374151', background: '#f9fafb' };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
            backgroundImage: `linear-gradient(45deg, ${colors.primary}20, ${colors.secondary}20)`,
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary}15 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${colors.secondary}15 0%, transparent 50%)`,
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '900px',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            {/* Chapter Badge */}
            {chapter && (
              <div
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '24px',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '24px',
                }}
              >
                {chapter === 'epilogue' ? 'Epilogue' : `Chapter ${chapter}`}
              </div>
            )}
            
            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: '800',
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: '1.1',
                marginBottom: '24px',
              }}
            >
              {title}
            </h1>
            
            {/* Description */}
            <p
              style={{
                fontSize: '24px',
                color: '#6b7280',
                lineHeight: '1.4',
                maxWidth: '700px',
              }}
            >
              {description}
            </p>
            
            {/* Brand */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '18px',
                color: '#9ca3af',
              }}
            >
              <span style={{ marginRight: '8px' }}>✨</span>
              Storytelling Portfolio
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}