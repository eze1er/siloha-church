import { IEvent } from '@/models/Event';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start mb-4">
        <div className="bg-primary text-white rounded-lg p-3 text-center min-w-16 mr-4">
          <div className="text-lg font-bold">
            {format(startDate, 'dd', { locale: fr })}
          </div>
          <div className="text-sm uppercase">
            {format(startDate, 'MMM', { locale: fr })}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {event.title}
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {format(startDate, 'HH:mm', { locale: fr })} - {format(endDate, 'HH:mm', { locale: fr })}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {event.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Organisé par {event.organizer}
        </span>
        <button className="btn-primary text-sm px-4 py-2">
          Plus d'infos
        </button>
      </div>
    </div>
  );
}