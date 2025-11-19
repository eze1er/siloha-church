import {
  getChannelVideosPaginated,
  searchVideosPaginated,
} from "@/lib/youtube-api";
import Videos from "@/components/youtube/Videos";
import SearchBar from "@/components/common/SearchBar";
import Pagination from "@/components/common/Pagination";

interface SermonsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
    page?: string;
    pageNum?: string;
    search?: string;
  };
}

export default async function SermonsPage({ searchParams }: SermonsPageProps) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const pageToken = (searchParams.page as string) || undefined;

  // 🔥 CORRECTION : Utiliser pageNum pour l'affichage aussi
  const currentPage = searchParams.pageNum
    ? parseInt(searchParams.pageNum as string)
    : 1;
  const pageSize = 16;

  console.log("=== DEBUG PAGE ===");
  console.log("searchParams:", searchParams);
  console.log("currentPage:", currentPage);
  console.log("pageToken:", pageToken);

  let videos: any[] = [];
  let nextPageToken: string | undefined;
  let prevPageToken: string | undefined;
  let totalResults: number | undefined;

  if (search) {
    const searchResult = await searchVideosPaginated(
      search,
      pageSize,
      pageToken
    );
    videos = searchResult.videos;
    nextPageToken = searchResult.nextPageToken;
    prevPageToken = searchResult.prevPageToken;
    totalResults = searchResult.totalResults;
  } else {
    const channelResult = await getChannelVideosPaginated(pageSize, pageToken);
    videos = channelResult.videos;
    nextPageToken = channelResult.nextPageToken;
    prevPageToken = channelResult.prevPageToken;
    totalResults = channelResult.totalResults;
  }
// Après la récupération des vidéos, ajoutez :
console.log('=== DEBUG VIDEO STRUCTURE ===');
if (videos.length > 0) {
  console.log('Première vidéo:', videos[0]);
  console.log('ID structure:', videos[0].id);
  console.log('VideoId disponible:', videos[0].id.videoId);
}
  // 🔥 CALCUL DYNAMIQUE : Utiliser currentPage qui vient des searchParams
  const totalPages = totalResults ? Math.ceil(totalResults / pageSize) : 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sermons</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos prédications passées et grandissez dans votre foi
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar placeholder="Rechercher un sermon..." />
        </div>

        {/* 🔥 CORRECTION : Info résultats avec currentPage dynamique */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {videos.length} sermon(s) trouvé(s)
            {search && ` pour "${search}"`}
            {totalResults && ` sur ${totalResults} au total`}
            {totalPages > 1 && ` - Page ${currentPage} sur ${totalPages}`}
          </p>

          {search && videos.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                🔍 Aucun sermon trouvé pour "{search}" dans notre chaîne.
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                Essayez d'autres mots-clés ou consultez tous nos sermons
                ci-dessous.
              </p>
            </div>
          )}
        </div>

        {/* Videos Grid */}
        <Videos
          videos={videos}
          title={
            search
              ? `Résultats pour "${search}"`
              : `Sermons - Page ${currentPage}`
          }
        />

        {/* Pagination */}
        {(nextPageToken || prevPageToken) && (
          <Pagination
            nextPageToken={nextPageToken}
            prevPageToken={prevPageToken}
            currentPage={currentPage}
            totalResults={totalResults}
            pageSize={pageSize}
            search={search}
          />
        )}
      </div>
    </div>
  );
}
