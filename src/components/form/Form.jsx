import { useState } from 'react';
import { Box, Button, Container, Grid2, Paper, FormControl, InputLabel, Slider, TextField, Select, Typography, MenuItem} from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';
import { oldBooksDB, newBooksDB } from '../../data/';

export const Form = ({ game, setGame }) => {
    const [form, setForm] = useState({
      rondasQuantity: 1,
      questionsQuantity: 5,
      participant: '',
      participantList: [],
      secondAnswer: 30
    });
    const { rondasQuantity, questionsQuantity, participant, participantList, secondAnswer } = form;

    const onRondasQuantityChange = ({ target }) => {
      const { value, name} = target;

      if ( value.length === '' ) return;

      const numberValue = parseInt(value);

      if ( numberValue < 1 ) {
        setForm({
          ...form,
          [name]: 1
        });
      }
      else if ( numberValue > 4 ) {
        setForm({
          ...form,
          [name]: 4
        });
      } 
      else {
        setForm({
          ...form,
          [name]: numberValue
        });
      }
      
    }

    const onQuestionsQuantityChange = ({ target }) => {
      const { value, name} = target;

      if ( value.length === '' ) return;

      const numberValue = parseInt(value);

      if ( numberValue < 5 ) {
        setForm({
          ...form,
          [name]: 5
        });
      }
      else if ( numberValue > 15 ) {
        setForm({
          ...form,
          [name]: 15
        });
      } 
      else {
        setForm({
          ...form,
          [name]: numberValue
        });
      }
      
    }

    const onCancel = () => {
      setGame({
        ...game,
        'started': false
      });
    }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Inicialización del Juego</Typography>
          <Grid2 container spacing={2}>
            {/* Rounds and Questions */}
            <Grid2 size={6} >
              <TextField id="" name="rondasQuantity" type="number" label="Rondas" variant="standard" fullWidth  autoComplete="off" 
                value={ rondasQuantity }
                onChange={ onRondasQuantityChange }
              />
            </Grid2>
            <Grid2 size={6} >
              <TextField id="" name="questionsQuantity" type="number" label="Preguntas" variant="standard" fullWidth   autoComplete="off" 
                value={ questionsQuantity }
                onChange={ onQuestionsQuantityChange }
              />
            </Grid2>
            {/* Participants and Second to Answer */}
            <Grid2 size={6} >
              <Grid2 container spacing={1} sx={{ alignItems: 'center' }} >
                <Grid2 sx={{ flexGrow: 1 }}>
                  <TextField id="" name="participants"  label="Participantes" variant="standard" fullWidth  autoComplete="off" 
                    value={ participant }
                  />
                </Grid2>
                <Button variant='text' size='sm' sx={{ minWidth: 0, p: 0,  alignSelf: 'end' }}>
                  <PersonAddAlt color="primary" />
                </Button>
              </Grid2>
            </Grid2>
            <Grid2 size={6} sx={{ alignSelf: 'end' }}>
              <Slider 
                sx={{ p: 0 }} 
                value={ secondAnswer } 
                aria-label="Segundo-a-responder" 
                valueLabelDisplay="auto" 
                shiftStep={30}
                step={10}
                marks
                min={30}
                max={180}  
              />
            </Grid2>
            {/* Select the books, old or new */}
            <Grid2 size={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="select-old-book">Seleccione Antiguo Testamento</InputLabel>
              <Select
                labelId="select-old-book"
                label="old-book"
                value={10}
              >
                { 
                  oldBooksDB.map( book => (
                    <MenuItem key={book.name} value={book.id}>{ book.name }</MenuItem>
                  ))
                }
              
              </Select>
            </FormControl>
            </Grid2>
            <Grid2 size={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="select-new-book">Seleccione Nuevo Testamento</InputLabel>
              <Select
                labelId="select-new-book"
                label="new-book"
                value={10}
              >
                { 
                  newBooksDB.map( book => (
                    <MenuItem key={book.name} value={book.id}>{ book.name }</MenuItem>
                  ))
                }
              
              </Select>
            </FormControl>
            </Grid2>
          </Grid2>
          <Box sx={{ mt: 5 }} >
            <Button variant="contained" sx={{ mr: 2 }}
            >Iniciar</Button>
            <Button variant="outlined"
            onClick={ onCancel }
            >Cancelar</Button>
          </Box>
      </Paper>
    </Container>
  )
}