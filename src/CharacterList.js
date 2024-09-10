import React, { useMemo } from 'react';
import { useCharacterContext } from './CharacterContext';
import Character from './Character';
import { Box } from '@mui/material';

function CharacterList() {
  const { characters, updateCharacter, deleteCharacter, handleEdit } = useCharacterContext();

  // Use useMemo to sort characters and only re-compute when characters array changes
  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => a.initiative - b.initiative);
  }, [characters, handleEdit]); 

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
      {sortedCharacters.map(character => (
        <Character 
          key={character.id} 
          character={character}
          onUpdate={updateCharacter}
          handleDelete={deleteCharacter}
          handleEdit={() => handleEdit(character.id)}
        />
      ))}
    </Box>
  );
}

export default CharacterList;
