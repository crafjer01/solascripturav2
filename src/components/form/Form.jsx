import { useState } from 'react';
import { Box, Button, Container, Grid2, Paper, FormControl, InputLabel, Slider, TextField, Select, Typography, MenuItem} from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';
import { oldBooksDB, newBooksDB } from '../../data/';

export const Form = ({ game, setGame }) => {
  const [secondToAnswer, setSecondToAnswer] = useState(30);

  const onSecondToAnswerChange = ({ target }) => {
    setSecondToAnswer(target.value);
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
        <form>
          <Grid2 container spacing={2}>
            {/* Rounds and Questions */}
            <Grid2 size={6} >
              <TextField id="" name="round" type="number" label="Rondas" variant="standard" fullWidth  autoComplete="off" />
            </Grid2>
            <Grid2 size={6} >
              <TextField id="" name="round" type="number" label="Preguntas" variant="standard" fullWidth   autoComplete="off" />
            </Grid2>
            {/* Participants and Second to Answer */}
            <Grid2 size={6} >
              <Grid2 container spacing={1} sx={{ alignItems: 'center' }} >
                <Grid2 sx={{ flexGrow: 1 }}>
                  <TextField id="" name="participants"  label="Participantes" variant="standard" fullWidth  autoComplete="off" />
                </Grid2>
                <Button variant='text' size='sm' sx={{ minWidth: 0, p: 0,  alignSelf: 'end' }}>
                  <PersonAddAlt color="primary" />
                </Button>
              </Grid2>
            </Grid2>
            <Grid2 size={6} sx={{ alignSelf: 'end' }}>
              <Slider 
                sx={{ p: 0 }} 
                defaultValue={0} 
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
            <Button variant="contained" type="submit" sx={{ mr: 2 }}
            >Iniciar</Button>
            <Button variant="outlined" type="submit"
            onClick={ onCancel }
            >Cancelar</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}