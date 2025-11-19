'use client';

import { useEffect } from 'react';
import { decodeHtmlEntities } from '@/lib/utils'; // 🔥 IMPORT

interface VideoModalProps {
  video: {
    id: {
      videoId: string;
      kind?: string;
    };
    snippet: {
      title: string;
      description: string;
    };
  };
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoId = video.id.videoId;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          {/* 🔥 DÉCODER LE TITRE DANS LE MODAL */}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {decodeHtmlEntities(video.snippet.title)}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={decodeHtmlEntities(video.snippet.title)} // 🔥 DÉCODER LE TITRE ICI AUSSI
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>ID de vidéo non disponible</p>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            {/* 🔥 DÉCODER LA DESCRIPTION DANS LE MODAL */}
            <p className="text-gray-700">{decodeHtmlEntities(video.snippet.description)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}