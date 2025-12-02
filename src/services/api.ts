import type{ Character, Episode, ApiResponse, CharacterFilters } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  getCharacters: async (filters: CharacterFilters = {}): Promise<ApiResponse<Character>> => {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.page) params.append('page', filters.page.toString());

    const url = `${BASE_URL}/character?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }
    
    return response.json();
  },

  getCharacter: async (id: number): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.statusText}`);
    }
    
    return response.json();
  },

  getEpisodes: async (episodeUrls: string[]): Promise<Episode[]> => {
    if (episodeUrls.length === 0) return [];
    
    const episodeIds = episodeUrls.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });

    const idsString = episodeIds.join(',');
    const response = await fetch(`${BASE_URL}/episode/${idsString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  }
};