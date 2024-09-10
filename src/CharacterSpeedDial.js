import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useCharacterContext } from './CharacterContext';

const CharacterSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [maxHP, setMaxHP] = useState('');
  const [initiative, setInitiative] = useState('');
  const { characters, addCharacter } = useCharacterContext();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddNewCharacter = () => {
    if (name.trim() && maxHP && initiative) {
        const newCharacter = {
            name: name.trim(),
            maxHP: parseInt(maxHP, 10),
            initiative: parseInt(initiative, 10)
        };
        addCharacter(newCharacter);
        handleClose();
        setName('');
        setMaxHP('');
        setInitiative('');
    } else {
        console.log("Invalid character details"); // Optionally, show an error message to the user
    }
};


  const handleExportCharacters = () => {
    const dataStr = JSON.stringify(characters);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileName = 'characters.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  const handleImportCharacters = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedCharacters = JSON.parse(e.target.result);
          importedCharacters.forEach(character => {
            const newCharacter = {
              name: character.name,
              maxHP: character.initialHealth,
              initiative: character.initiative
            };
            addCharacter(newCharacter);
          });
        } catch (error) {
          console.error('Failed to parse characters:', error);
        }
        event.target.value = '';
      };
      reader.readAsText(file);
    }
  };

  const actions = [
    { icon: <FileUploadIcon />, name: 'Import', action: () => document.getElementById('import-characters-file').click() },
    { icon: <FileDownloadIcon />, name: 'Export', action: handleExportCharacters },
    { icon: <AddIcon />, name: 'Add New', action: handleClickOpen }
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Character Management Actions"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>

      {/* Hidden file input for importing characters */}
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        id="import-characters-file"
        onChange={handleImportCharacters}
      />
        
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Character</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Character Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="maxHP"
            label="Max HP"
            type="number"
            fullWidth
            value={maxHP}
            onChange={(e) => setMaxHP(e.target.value)}
          />
          <TextField
            margin="dense"
            id="initiative"
            label="Initiative"
            type="number"
            fullWidth
            value={initiative}
            onChange={(e) => setInitiative(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewCharacter} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CharacterSpeedDial;
