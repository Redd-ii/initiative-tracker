import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useCharacterContext } from './CharacterContext';

const EditCharacter = () => {
  const { editingCharacter, updateCharacter, clearEditing } = useCharacterContext();
  const [formData, setFormData] = useState({ name: '', initiative: 0, maxHP: 0 });

  useEffect(() => {
    if (editingCharacter) {
      setFormData({
        name: editingCharacter.name,
        initiative: editingCharacter.initiative,
        maxHP: editingCharacter.initialHealth
      });
    }
  }, [editingCharacter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateCharacter(editingCharacter.id, {
      name: formData.name,
      initiative: parseInt(formData.initiative, 10),
      initialHealth: parseInt(formData.maxHP, 10)
    });
    clearEditing();
  };

  return (
    <Dialog open={Boolean(editingCharacter)} onClose={clearEditing}>
      <DialogTitle>Edit Character</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="name" label="Name" fullWidth value={formData.name} onChange={handleChange} />
        <TextField margin="dense" name="initiative" label="Initiative" type="number" fullWidth value={formData.initiative} onChange={handleChange} />
        <TextField margin="dense" name="maxHP" label="Max HP" type="number" fullWidth value={formData.maxHP} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={clearEditing}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCharacter;