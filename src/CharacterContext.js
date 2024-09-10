import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Character", initialHealth: 1, initiative: 0, currentHealth: 1 },
  ]);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const addCharacter = (newCharacter) => {
    setCharacters(prevCharacters => [...prevCharacters, {
        id: prevCharacters.length + 1, // Ensure unique ID
        name: newCharacter.name,
        initialHealth: parseInt(newCharacter.maxHP, 10),
        currentHealth: parseInt(newCharacter.maxHP, 10),
        initiative: parseInt(newCharacter.initiative, 10),
    }]);
  };

  const updateCharacter = useCallback((id, updatedData) => {
    setCharacters(prev => prev.map(char => char.id === id ? { ...char, ...updatedData } : char));
  }, []);

  const deleteCharacter = (id) => {
    setCharacters(prevCharacters => prevCharacters.filter(char => char.id !== id));
  };

  const handleEdit = useCallback((id) => {
    const characterToEdit = characters.find(char => char.id === id);
    setEditingCharacter(characterToEdit);
  }, [characters]);

  const clearEditing = useCallback(() => {
    setEditingCharacter(null);
  }, []);

  const value = useMemo(() => ({
    characters,
    updateCharacter,
    addCharacter,
    deleteCharacter,
    handleEdit,
    editingCharacter,
    clearEditing
  }), [characters, editingCharacter, clearEditing, handleEdit, updateCharacter]);

  return (
    <CharacterContext.Provider value={value}>
        {children}
    </CharacterContext.Provider>
  );
};

CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired  // 'node' covers anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
};

export function useCharacterContext() {
  return useContext(CharacterContext);
}
