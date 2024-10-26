import { Grid2, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const ParticipantPanel = () => {
  const { currentRound, rounds, currentParticipant, questionAmountByParticipantIndex, questionAmountByParticipant } = useSelector(state => state.game);

  const { name, answered, guess, fail, skip } = currentParticipant;
  return (
    <Grid2
      container
      spacing={2}
      size={4}
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "3px solid #00838f",
        borderRadius: "3px",
      }}
    >
      <Grid2>
        <Typography variant="body1" component="h2" sx={{ mb: 2 }}><b>Participante:</b> { name }</Typography>
        <hr />
        <Typography variant="body1" component="h2"><b>Preguntas:</b> </Typography>
        <Typography variant="body1" component="h4">Realizadas: { answered }</Typography>
        <Typography variant="body1" component="h4">Acertadas: { guess }</Typography>
        <Typography variant="body1" component="h4">Falladas: { fail }</Typography>
        <Typography variant="body1" component="h4" sx={{ mb: 2 }}>saltadas: { skip }</Typography>
        <hr />
        <Typography variant="body1" component="h2">
          <b>Preguntas</b> {questionAmountByParticipantIndex} de {questionAmountByParticipant} 
        </Typography>
      </Grid2>
      <Grid2>
        <hr />
        <Typography variant="body1" component="h2">
          <b>Ronda </b> { currentRound } de { rounds }
        </Typography>
        <Typography variant="body1" component="h2">
          <b>Rondas Canceladas:</b> 0
        </Typography>
      </Grid2>
    </Grid2>
  );
};
