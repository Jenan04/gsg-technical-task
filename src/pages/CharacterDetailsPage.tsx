import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter, useEpisodes } from '../utils/useCharacters';
import EpisodeList from '../components/EpisodeList';

const CharacterDetailsPage = () =>{
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const characterId = parseInt(id || '0');

  const { data: character, isLoading: characterLoading, error: characterError } = useCharacter(characterId);
  const { data: episodes, isLoading: episodesLoading } = useEpisodes(character?.episode || []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (characterLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (characterError || !character) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Characters
          </button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Character Not Found</h2>
            <p className="text-gray-600">The character you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Characters
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <span 
                className={`absolute top-4 right-4 ${getStatusColor(character.status)} text-white text-lg px-3 py-1 rounded-full`}
              >
                {character.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {character.name}
                </h1>
                <p className="text-gray-600">Character #{character.id}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Species:</span>
                      <span>{character.species}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Gender:</span>
                      <span>{character.gender}</span>
                    </div>
                    {character.type && (
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span>{character.type}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Location Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Origin:</span>
                      <span className="text-right">{character.origin.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last Location:</span>
                      <span className="text-right">{character.location.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Episode Count</h3>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {character.episode.length}
                    </span>
                    <p className="text-gray-600">Episodes appeared in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <EpisodeList 
            episodes={episodes || []} 
            isLoading={episodesLoading} 
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailsPage;