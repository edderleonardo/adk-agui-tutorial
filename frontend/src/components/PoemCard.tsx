interface PoemData {
    topic: string;
    style: string;
    poem: string;
}

interface PoemCardProps {
    data?: PoemData;
    topic?: string;
}

export function PoemCard({ data, topic }: PoemCardProps) {
    // Loading state - when data is not yet available
    if (!data) {
      return (
        <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-6 text-white shadow-lg animate-pulse">
          <div className="h-6 bg-white/30 rounded w-48 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/30 rounded w-full"></div>
            <div className="h-4 bg-white/30 rounded w-5/6"></div>
            <div className="h-4 bg-white/30 rounded w-4/6"></div>
          </div>
          <p className="mt-4 text-sm opacity-75">
            Writing poem about "{topic}"...
          </p>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-6 text-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-75 uppercase tracking-wide">Poem</p>
            <h3 className="text-xl font-bold">{data.topic}</h3>
          </div>
          <span className="text-4xl">🎭</span>
        </div>

        {/* Poem content */}
        <div className="bg-white/20 rounded-lg p-4 mb-4">
          <p className="whitespace-pre-line italic leading-relaxed">
            {data.poem}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm opacity-75">
          <span className="capitalize">Style: {data.style}</span>
          <span>✨ Generated with AI!</span>
        </div>
      </div>
    );
  }
