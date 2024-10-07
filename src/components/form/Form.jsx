import { useState } from 'react';
import { Box, Button, Container, Grid2, Paper, FormGroup, InputLabel, Slider, TextField, Select, Typography, 
  MenuItem, List, IconButton, ListItem, ListItemText, ListItemAvatar, Avatar,
  FormControlLabel,
  Checkbox} from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';
import { oldBooksDB, newBooksDB } from '../../data/';
import { ParticipantList } from './ParticipantList';
import { SelectBook } from './SelectBook';

export const Form = ({ game, setGame }) => {
    const [form, setForm] = useState({
      rondasQuantity: 1,
      questionsQuantity: 5,
      participant: '',
      participantList: [],
      secondAnswer: 30,
      bookOldSelected: [],
      bookNewSelected: [],
      allBible: false,
      oldBook: false,
      newBook: false

    });
    const { rondasQuantity, questionsQuantity, participant, participantList, secondAnswer, bookOldSelected, bookNewSelected, oldBook, allBible, newBook } = form;
    const [isDuplicated, setIsDuplicated] = useState(false);
   // const [disabledSelectOldBook, setDisabledSelectOldBook] = useState(false);

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

    const onParticipantChange = ({ target }) => {
      const { value, name } = target;

      setForm({
        ...form,
        [name]: value
      });
    }
    const addParticipant = () => {
      if ( participant === '' ) return;

      if( participantList.includes(participant) ) {
        setIsDuplicated(true);
      } else {
        setIsDuplicated(false);
        setForm({
          ...form,
          ['participantList']: [...participantList, participant],
          ['participant']: ''
        });
      }
    }

    const onSecondAswerChange = ({ target }) => {
      const {value, name} = target;
      setForm({
        ...form,
        [name]: value
      });
    }

    const onBookOldSelecChange = ({ target }) => {
      const { value } = target;
      setForm({
        ...form,        
        ['bookOldSelected']: typeof value === 'string' ? value.split(',') : value,
      });
    }

    const onBookNewSelecChange = ({ target }) => {
      const { value } = target;
      setForm({
        ...form,        
        ['bookNewSelected']: typeof value === 'string' ? value.split(',') : value,
      });
    }

    const onHandleDelete = (name) => {
      setForm({
        ...form,
        ['participantList']: participantList.filter(participant => participant !== name)
      });
    }

    const onCheckAllBible = () => {
      setForm({
        ...form,
        bookOldSelected: [],
        bookNewSelected: [], 
        allBible: !allBible
      });
    }

    const onCheckOldBook = () => {
      setForm({
        ...form,
        bookOldSelected: [],
        oldBook: !oldBook
      });
    }

    const onCheckNewBook = () => {
      setForm({
        ...form,
        bookNewSelected: [], 
        newBook: !newBook
      });
    }

    const onCancel = () => {
      setGame({
        ...game,
        'started': false
      });
    }

    const disabledSelectOldBook = (allBible || oldBook);
    const disabledSelectNewBook = (allBible || newBook);

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
                  <TextField id="" name="participant"  label="Participantes" variant="standard" fullWidth  autoComplete="off" 
                    disabled={participantList?.length === 4 ? true : false}
                    value={ participant }
                    onChange={ onParticipantChange }
                  />
                </Grid2>
                <IconButton 
                  variant='text' size='sm' 
                  sx={{ minWidth: 0, p: 0,  alignSelf: 'end' }}
                  disabled={participantList?.length === 4 ? true : false} 
                  onClick={ addParticipant }
                >
                  <PersonAddAlt color={`${participantList?.length === 4 ? '' : 'primary'}`} />
                </IconButton>
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
                name="secondAnswer"
                onChange={ onSecondAswerChange }  
              />
            </Grid2>
            <Grid2 size={6}>
              { isDuplicated && <Typography component="p" sx={{ color: 'red', fontStyle: 'italic', fontSize: '14px' }}>El participante esta duplicado.</Typography> }
            </Grid2>
            {/* participant List */}
            <Grid2 size={12}>
              { participantList?.length > 0 && <ParticipantList participants={participantList} onHandleDelete={onHandleDelete} /> } 
            </Grid2>
            {/* Select the books, old or new */}
            <Grid2 size={6}>
              <SelectBook books={oldBooksDB} name="Viejo" onBookSelecChange={onBookOldSelecChange} booksSelected={bookOldSelected} selectDisabled={disabledSelectOldBook}  />
            </Grid2>
            <Grid2 size={6}>
              <SelectBook books={newBooksDB} name="Nuevo" onBookSelecChange={onBookNewSelecChange} booksSelected={bookNewSelected} selectDisabled={disabledSelectNewBook}  />
            </Grid2>
            <Grid2 size={12}>
            <FormGroup row sx={{ justifyContent: 'space-between'}} >
                <FormControlLabel control={<Checkbox size="small" onClick={ onCheckOldBook } disabled={allBible}  />} label="Todo el viejo testamento"
                  
                />
                <FormControlLabel control={<Checkbox size="small" onClick={ onCheckAllBible } />} label="Toda la biblia" 
                  
                />
                <FormControlLabel control={<Checkbox size="small" onClick={ onCheckNewBook } disabled={allBible} />} label="Todo el nuevo testamento" 
                />
              </FormGroup>
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