import { YouTubeVideo } from '@/lib/youtube-api';
import VideoCard from './VideoCard';

interface VideosProps {
  videos: YouTubeVideo[];
  title?: string;
}

export default function Videos({ videos, title }: VideosProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={`${video.id.videoId}-${index}`} video={video} />
        ))}
      </div>
    </div>
  );
}