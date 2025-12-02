import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import CharacterList from '../components/CharacterList';
import useCharacters from '../utils/useCharacters';
import type { CharacterFilters } from '../types';

const CharactersPage = () =>{
  const [filters, setFilters] = useState<CharacterFilters>({
    page: 1
  });

  const { data, isLoading, error } = useCharacters(filters);

  const handleSearch = (name: string) => {
    setFilters(prev => ({
      ...prev,
      name: name.trim() || undefined,
      page: 1
    }));
  };

  const handleNextPage = () => {
    if (data?.info.next) {
      setFilters(prev => ({
        ...prev,
        page: (prev.page || 1) + 1
      }));
    }
  };

  const handlePrevPage = () => {
    if (data?.info.prev && (filters.page || 1) > 1) {
      setFilters(prev => ({
        ...prev,
        page: (prev.page || 1) - 1
      }));
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Characters</h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rick and Morty Characters
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore the multiverse of Rick and Morty characters
          </p>

          <SearchInput 
            onSearch={handleSearch}
            placeholder="Search characters by name..."
          />
        </div>

        {data && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {data.results.length} of {data.info.count} characters
              {filters.name && (
                <span className="font-medium"> for "{filters.name}"</span>
              )}
            </p>
          </div>
        )}

        <CharacterList
          characters={data?.results || []}
          isLoading={isLoading}
          hasNextPage={!!data?.info.next}
          hasPrevPage={!!data?.info.prev}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          currentPage={filters.page || 1}
          totalPages={data?.info.pages || 1}
        />
      </div>
    </div>
  );
}
export default CharactersPage;