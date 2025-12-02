import type{ Episode } from '../types';

interface EpisodeListProps {
  episodes: Episode[];
  isLoading?: boolean;
}

const EpisodeList = ({ episodes, isLoading }: EpisodeListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading episodes...</span>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No episodes found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Episodes ({episodes.length})</h3>
      <div className="grid gap-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold">{episode.name}</h4>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {episode.episode}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Air Date: {episode.air_date}</span>
              <span>{episode.characters.length} characters</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;