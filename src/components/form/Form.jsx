import { Container, Grid2, Paper, Typography } from '@mui/material';
import { ShowParticipants, AddParticipant, ParticipantDuplicatedMessage, 
   AddRounds, AddQuestionNumber,AddTimer, AddBooksSelected, ButtonStart} from './';

export const Form = () => {
  
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Typography 
          variant='h5' 
          component="h2" 
          sx={{ textAlign: 'center', mb: 3 }}>
            Inicialización del Juego
        </Typography>
        <Grid2 container spacing={2}>
          <AddRounds />
          <AddQuestionNumber />
          <AddParticipant />
          <AddTimer />
          <ParticipantDuplicatedMessage />
          <ShowParticipants />
          <AddBooksSelected />
        </Grid2>
          <ButtonStart />
      </Paper>
    </Container>
  )
}