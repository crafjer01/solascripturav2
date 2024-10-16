import { Grid2, Box, Button } from '@mui/material';

export const NavigationButtons = ({ onNextQuestion, answerSelected, participants, roundsQuantity, roundCounter,
    questionCounter, questionsQuantity
 }) => {

  return (
    <Grid2 container size={12} sx={{ mt: 4, mb: 2 }}>
      <Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button 
                variant="contained" 
                sx={{ mr: 1 }} 
                onClick={ onNextQuestion }
                disabled={ !answerSelected }
            >
            {questionCounter === questionsQuantity ? 'Finalizar' : 'Siguiente'}
          </Button>
          <Button variant="contained" sx={{ mr: 1 }}>
            Pasar pregunta
          </Button>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            disabled={participants.length === 2}
          >
            Retirar Participante
          </Button>
          <Button
            variant="contained"
            disabled={roundsQuantity === roundCounter}
          >
            Cancelar Ronda
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};
