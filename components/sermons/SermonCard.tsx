import Link from 'next/link';
import { ISermon } from '@/models/Sermon';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SermonCardProps {
  sermon: ISermon;
}

export default function SermonCard({ sermon }: SermonCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video mb-4 bg-gray-200 rounded-lg overflow-hidden">
        {sermon.thumbnail ? (
          <img
            src={sermon.thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Eglise Siloe</span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {sermon.title}
      </h3>
      
      <p className="text-gray-600 mb-3 line-clamp-2">
        {sermon.description}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Par {sermon.speaker}</span>
        <span>
          {format(new Date(sermon.publishedAt), 'dd MMMM yyyy', { locale: fr })}
        </span>
      </div>
      
      <Link
        href={`/sermons/${sermon._id}`}
        className="btn-primary w-full text-center block"
      >
        Regarder
      </Link>
    </div>
  );
}