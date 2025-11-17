import Link from 'next/link';
import { YouTubeVideo } from '@/lib/youtube-api';
import { decodeHtmlEntitiesServer } from '@/lib/utils';

interface VideoListProps {
  videos: YouTubeVideo[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (!videos || videos.length === 0) {
    return (
      <p className="text-gray-500 text-sm">Aucune autre vidéo disponible.</p>
    );
  }

  return (
    <div className="space-y-4">
      {videos.slice(0, 5).map((video) => {
        const decodedTitle = decodeHtmlEntitiesServer(video.snippet.title);
        
        return (
          <Link
            key={video.id.videoId}
            href={`/sermons/${video.id.videoId}`}
            className="flex space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0 w-24 h-16 bg-gray-200 rounded overflow-hidden">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={decodedTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                {decodedTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(video.snippet.publishedAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}