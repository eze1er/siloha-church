import Link from 'next/link';
import { YouTubeVideo } from '@/lib/youtube-api';
import { decodeHtmlEntitiesServer } from '@/lib/utils';

interface VideoCardProps {
  video: YouTubeVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const { videoId } = video.id;
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  const decodedTitle = decodeHtmlEntitiesServer(title);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/sermons/${videoId}`} className="block">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={thumbnails.high.url}
            alt={decodedTitle}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/sermons/${videoId}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {decodedTitle}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{channelTitle}</span>
          <span>{new Date(publishedAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>
    </div>
  );
}