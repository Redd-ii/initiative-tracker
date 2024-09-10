import React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './Theme'; // Ensure this theme setup is correctly imported
import { CharacterProvider, useCharacterContext } from './CharacterContext'; // Adjust the path if your context file is located elsewhere
import CharacterList from './CharacterList'; // Adjust the path if your CharacterList component is located elsewhere
import CharacterSpeedDial from './CharacterSpeedDial';  // Adjust the path if your NewCharacter component is located elsewhere
import EditCharacter from './EditCharacter'; // Adjust the path if your EditCharacter component is located elsewhere

const App = () => {
  // Using context to access character management functions and state
  const { setEditingCharacter } = useCharacterContext();
  const [open, setOpen] = React.useState(false); // Corrected here

  const handleEditOpen = (character) => {
      setEditingCharacter(character);
      setOpen(true); // Open the dialog
  };

  const handleClose = () => {
      setOpen(false); // Close the dialog
  };

  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <CharacterProvider>
              <Container>
                  <CharacterList onEdit={handleEditOpen} />
                  <CharacterSpeedDial />
                      <EditCharacter 
                      open={open}
                      handleClose={handleClose}/> 
              </Container>
          </CharacterProvider>
      </ThemeProvider>
  );
}

export default App;