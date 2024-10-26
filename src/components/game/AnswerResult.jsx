import { Grid2, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export const AnswerResult = () => {
    const { currentQuestion } = useSelector(state => state.game);
    const { answered_correct, is_proceed, comodin_cite_used, comodin_call_used } = currentQuestion;

  return (
    <>
      {/* Answer results and Navigate Buttons */}
      <Grid2 container sx={{ pt: 2, borderTop: "4px solid #ccc", justifyContent: 'space-between' }}>
        <Grid2 size={8}>
        { ( answered_correct && is_proceed ) && <Typography variant="body1" component="p">Genial la repuesta correcta es { currentQuestion?.correct_answer }</Typography> }
        { ( !answered_correct && is_proceed ) && <Typography variant="body1" component="p">Lo siento la repuesta correcta es { currentQuestion?.correct_answer } </Typography> }
        { ( (comodin_cite_used) || is_proceed ) && <Typography variant="body1" component="p"> Cita Biblica: { currentQuestion?.cite } </Typography> }
        { ( comodin_call_used && !is_proceed) && <Typography variant="body1" component="p">
            Tienes la oportunidad de preguntarle a alguien dentro de la sala o
            fuera de la sala.
          </Typography> }
        </Grid2>
        <Grid2 size={4} sx={{ display: 'flex', justifyContent: 'end' }}>
            { ( answered_correct && is_proceed) && <Box sx={{  width: '150px' }} >  <img src="/assets/feliz.gif" alt="Feliz" /></Box> }
            { ( !answered_correct && is_proceed ) && <Box sx={{  width: '150px' }} ><img src="/assets/triste.gif" alt="Triste" /></Box> }
        </Grid2>
      </Grid2>
    </>
  );
};
