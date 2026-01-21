interface VideoPlayerProps {
  thumbnail: string;
  title: string;
  onComplete?: () => void;
}

export function VideoPlayer({ thumbnail, title, onComplete }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover opacity-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          onClick={onComplete}
          className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Play video"
        >
          <svg
            className="w-10 h-10 text-primary-600 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <p className="mt-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
          Click to simulate video completion
        </p>
      </div>

      {/* Video Controls Bar (static) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-primary-400 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <div className="flex-1 bg-gray-600 rounded-full h-1">
            <div className="bg-primary-500 h-1 rounded-full w-1/3" />
          </div>

          <span className="text-white text-sm">5:30 / 15:00</span>

          <button className="text-white hover:text-primary-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>

          <button className="text-white hover:text-primary-400 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
