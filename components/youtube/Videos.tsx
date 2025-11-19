'use client';

import { useState } from 'react';
import VideoModal from './VideoModal';
import { decodeHtmlEntities } from '@/lib/utils'; // 🔥 IMPORT

interface Video {
  id: {
    videoId: string;
    kind?: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface VideosProps {
  videos: Video[];
  title?: string;
}

export default function Videos({ videos, title }: VideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getVideoId = (video: Video): string => {
    return video.id.videoId;
  };

  const handleVideoClick = (video: Video) => {
    const videoId = getVideoId(video);
    setSelectedVideo(video);
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucune vidéo trouvée</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {decodeHtmlEntities(title)} {/* 🔥 DÉCODER LE TITRE AUSSI */}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => {
          const videoId = getVideoId(video);
          
          return (
            <div
              key={`${videoId}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative aspect-video">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={decodeHtmlEntities(video.snippet.title)} // 🔥 DÉCODER L'ALT
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                {/* 🔥 DÉCODER LE TITRE DE LA VIDÉO */}
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {decodeHtmlEntities(video.snippet.title)}
                </h3>
                
                {/* 🔥 DÉCODER LA DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-2">
                  {decodeHtmlEntities(video.snippet.description)}
                </p>
                
                <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>{decodeHtmlEntities(video.snippet.channelTitle)}</span>
                  <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}