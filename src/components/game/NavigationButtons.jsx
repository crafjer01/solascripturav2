import { Grid2, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { newQuestion } from '../../store/slicers/gameSlicer';

export const NavigationButtons = () => {
  const { currentQuestion, questionAmountByParticipantIndex, questionAmountByParticipant,
        participants, rounds, currentRound } = useSelector(state => state.game);
  const dispatch =  useDispatch();

  const isLastQuestion = questionAmountByParticipantIndex === questionAmountByParticipant;
  const canRetireParticipants = participants.length > 2;
  const canCancelRound = rounds > currentRound;

  return (
    <Grid2 container size={12} sx={{ mt: 4, mb: 2 }}>
      <Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button 
                variant="contained" 
                sx={{ mr: 1 }} 
                onClick={ () => dispatch( newQuestion() ) }
                disabled={ !currentQuestion?.is_proceed }
            >
            {(isLastQuestion) ? 'Finalizar' : 'Siguiente'}
          </Button>
          <Button variant="contained" sx={{ mr: 1 }}
            disabled={ isLastQuestion }
          >Pasar pregunta
          </Button>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            disabled={ !canRetireParticipants }
          > Retirar Participante
          </Button>
          <Button
            variant="contained"
            disabled={ !canCancelRound }
          >Cancelar Ronda
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};
