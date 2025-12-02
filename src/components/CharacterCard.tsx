import type{ Character } from '../types';
import { useNavigate } from 'react-router-dom';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <span 
          className={`absolute top-2 right-2 ${getStatusColor(character.status)} text-white text-xs px-2 py-1 rounded-full`}
        >
          {character.status}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{character.name}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Species:</span> {character.species}</p>
          <p><span className="font-medium">Gender:</span> {character.gender}</p>
          <p><span className="font-medium">Origin:</span> {character.origin.name}</p>
          <p><span className="font-medium">Location:</span> {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;