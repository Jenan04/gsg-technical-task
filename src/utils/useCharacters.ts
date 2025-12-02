import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { CharacterFilters } from '../types';

const useCharacters = (filters: CharacterFilters = {}) => {
  return useQuery({
    queryKey: [
      'characters',
      filters.page,
      filters.name,
      filters.status,
      filters.species,
      filters.gender,
    ],
    queryFn: () => api.getCharacters(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => api.getCharacter(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useEpisodes = (episodeUrls: string[]) => {
  return useQuery({
    queryKey: ['episodes', episodeUrls],
    queryFn: () => api.getEpisodes(episodeUrls),
    enabled: episodeUrls.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
export default useCharacters;