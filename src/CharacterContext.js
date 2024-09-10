import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Five", initialHealth: 45, initiative: 0, currentHealth: 45 },
    { id: 2, name: "Lucrecia", initialHealth: 40, initiative: 0, currentHealth: 40 },
    { id: 3, name: "Olofir", initialHealth: 32, initiative: 0, currentHealth: 32 },
    { id: 4, name: "Thorlin", initialHealth: 24, initiative: 0, currentHealth: 24 },
    { id: 5, name: "Daelis", initialHealth: 31, initiative: 0, currentHealth: 31 }
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
  }), [characters, editingCharacter]);

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
