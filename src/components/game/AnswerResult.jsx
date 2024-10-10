import { Grid2, Typography, Box } from '@mui/material';

export const AnswerResult = () => {
  return (
    <>
      {/* Answer results and Navigate Buttons */}
      <Grid2 container sx={{ pt: 2, borderTop: "4px solid #ccc" }}>
        <Grid2 size={12}>
          <Typography variant="body1" component="p">
            Genial la repuesta correcta es{" "}
          </Typography>
          <Typography variant="body1" component="p">
            Lo siento la repuesta correcta es{" "}
          </Typography>
          <Typography variant="body1" component="p">
            Cita Biblica:
          </Typography>
          <Typography variant="body1" component="p">
            Tienes la oportunidad de preguntarle a alguien dentro de la sala o
            fuera de la sala.
          </Typography>
        </Grid2>
      </Grid2>
    </>
  );
};
