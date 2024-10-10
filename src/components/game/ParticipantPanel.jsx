import { Grid2, Typography } from '@mui/material';

export const ParticipantPanel = ({ currentParticipant, roundCounter }) => {

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
        <Typography variant="body1" component="h2"><b>Participante:</b> { name }</Typography>
        <hr />
        <Typography variant="body1" component="h2"><b>Preguntas:</b> </Typography>
        <Typography variant="body1" component="h4">Realizadas: { answered }</Typography>
        <Typography variant="body1" component="h4">Acertadas: { guess }</Typography>
        <Typography variant="body1" component="h4">Falladas: { fail }</Typography>
        <Typography variant="body1" component="h4">saltadas: { skip }</Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1" component="h2">
          <b>Ronda #:</b> { roundCounter }
        </Typography>
        <Typography variant="body1" component="h2">
          <b>Rondas Canceladas:</b> 0
        </Typography>
      </Grid2>
    </Grid2>
  );
};
