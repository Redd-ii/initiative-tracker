import React, { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';
import { Box, Grid, TextField, Typography, Slider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Character.css';

const Character = ({
  character,
  onUpdate,
  handleDelete,
  handleEdit
}) => {
  const [name, setName] = useState(character.name);
  const [maxHP, setMaxHP] = useState(character.initialHealth);
  const [currentHealth, setCurrentHealth] = useState(character.currentHealth);
  const [initiative, setInitiative] = useState(character.initiative);
  const [damage, setDamage] = useState(0);
  const [healthToAdd, setHealthToAdd] = useState(0);

  useEffect(() => {
    setName(character.name);
    setMaxHP(character.initialHealth);
    setCurrentHealth(character.currentHealth);
    setInitiative(character.initiative);
  }, [character]);

  
  const handleInitiativeChange = (event) => {
    const newInitiative = parseInt(event.target.value, 10);
    onUpdate(character.id, { ...character, initiative: newInitiative });
  };

  const applyDamage = () => {
    const newHealth = Math.max(0, currentHealth - damage);
    setCurrentHealth(newHealth);
    setDamage(0); 
  };

  const addHealth = () => {
    const newHealth = Math.min(maxHP, currentHealth + healthToAdd);
    setCurrentHealth(newHealth);
    setHealthToAdd(0);
  };

  return (
    <Box 
      className="characterBox"
      border={3} 
      borderColor='grey.500' 
      borderRadius={3} 
      m={.5} 
      p={2} 
      sx={{ width: '100%', alignSelf: 'center' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      
    >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={4.5} ml={1}>
        
          <Typography fontSize={30} variant="h6" className="characterTitle">{name}</Typography>
          <Typography fontSize={24} color="textSecondary">HP: {currentHealth}/{character.initialHealth}</Typography>
          <Grid item xs={12} sm={8} mt={1}>
          <TextField
            label="Initiative"
            type="number"
            
            value={initiative}
            onChange={handleInitiativeChange}
            size={'small'}
            fullWidth
          />
        </Grid>
      </Grid> 
      <Grid item xs={12} sm={7}>
      <Typography gutterBottom>Add Health</Typography>
          <Slider
            value={healthToAdd}
            onChange={(event, newValue) => setHealthToAdd(newValue)}
            onChangeCommitted={addHealth}
            min={0}
            max={maxHP - currentHealth}  
            valueLabelDisplay="auto"
            color="success"
          />
          <Typography gutterBottom>Take Damage</Typography>
          <Slider
            value={damage}
            onChange={(event, newValue) => setDamage(newValue)}
            onChangeCommitted={applyDamage}
            min={0}
            max={currentHealth}  
            valueLabelDisplay="auto"
            color="error"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3} align={'right'}>
          <IconButton onClick={() => handleDelete(character.id)} color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(character.id)} color="primary">
            <EditIcon />
          </IconButton>
      </Grid>
    </Box>
  );
};


Character.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    initiative: PropTypes.number.isRequired,
    initialHealth: PropTypes.number.isRequired,
    currentHealth: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Character;
