'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  if (!isPlaying) {
    // Afficher la miniature cliquable
    return (
      <div 
        className="aspect-video bg-black rounded-t-lg overflow-hidden relative cursor-pointer"
        onClick={handleThumbnailClick}
      >
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title || 'Vidéo YouTube'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm">Cliquez pour lire</p>
        </div>
      </div>
    );
  }

  // Afficher le lecteur YouTube
  return (
    <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title || 'Vidéo YouTube'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}