'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  nextPageToken?: string;
  prevPageToken?: string;
  currentPage: number;
  totalResults?: number;
  pageSize: number;
  search?: string;
}

export default function Pagination({ 
  nextPageToken, 
  prevPageToken, 
  currentPage, 
  totalResults, 
  pageSize,
  search 
}: PaginationProps) {
  const searchParams = useSearchParams();
  
  const totalPages = totalResults ? Math.ceil(totalResults / pageSize) : 1;

  // 🔥 FONCTION AMÉLIORÉE : Inclure le numéro de page explicite
  const createPageUrl = (token?: string, pageNum?: number) => {
    const params = new URLSearchParams();
    
    // Préserver la recherche
    if (search) {
      params.set('search', search);
    }
    
    // Ajouter le token ET le numéro de page
    if (token) {
      params.set('page', token);
    }
    
  if (pageNum) {
    params.set('pageNum', pageNum.toString());
  } else {
    // Si pas de pageNum, supprimer le paramètre pour revenir à la page 1
    params.delete('pageNum');
  }
  
  console.log('🔄 Navigation vers:', `/sermons?${params.toString()}`); // Debug
  return `/sermons?${params.toString()}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-gray-200">
      {/* Info page - MAINTENANT DYNAMIQUE */}
      <div className="text-sm text-gray-600">
        Page {currentPage} sur {totalPages}
        {search && ` - Recherche : "${search}"`}
      </div>

      {/* Boutons navigation */}
      <div className="flex items-center gap-2">
        {/* Bouton Précédent */}
        {prevPageToken && currentPage > 1 ? (
          <Link
            href={createPageUrl(prevPageToken, currentPage - 1)}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ← Page {currentPage - 1}
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-100 text-gray-400 border border-gray-200 rounded-md cursor-not-allowed"
          >
            ← Précédent
          </button>
        )}

        {/* Indicateur de page actuelle */}
        <div className="px-3 py-2 bg-blue-600 text-white rounded-md font-medium">
          {currentPage}
        </div>

        {/* Bouton Suivant */}
        {nextPageToken && currentPage < totalPages ? (
          <Link
            href={createPageUrl(nextPageToken, currentPage + 1)}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Page {currentPage + 1} →
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-100 text-gray-400 border border-gray-200 rounded-md cursor-not-allowed"
          >
            Suivant →
          </button>
        )}
      </div>
    </div>
  );
}