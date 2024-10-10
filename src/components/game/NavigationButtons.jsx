import { Grid2, Box, Button } from '@mui/material';

export const NavigationButtons = ({ onNextQuestion, participants, roundsQuantity, roundCounter }) => {
  return (
    <Grid2 container size={12} sx={{ mt: 2, mb: 2 }}>
      <Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={ onNextQuestion }>
            Siguiente
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
