import { Grid2, Typography, Box } from '@mui/material';

export const AnswerResult = ({ isAnswerCorrect, answerSelected, currentQuestion, comodinCall, comodinCite, currentQuestionProceed }) => {

  return (
    <>
      {/* Answer results and Navigate Buttons */}
      <Grid2 container sx={{ pt: 2, borderTop: "4px solid #ccc", justifyContent: 'space-between' }}>
        <Grid2 size={8}>
        { ( isAnswerCorrect && currentQuestionProceed ) && <Typography variant="body1" component="p">Genial la repuesta correcta es { currentQuestion?.correct_answer }</Typography> }
        { ( !isAnswerCorrect && currentQuestionProceed ) && <Typography variant="body1" component="p">Lo siento la repuesta correcta es { currentQuestion?.correct_answer } </Typography> }
        { ( (currentQuestion?.comodin_cite_used) || currentQuestionProceed ) && <Typography variant="body1" component="p"> Cita Biblica: { currentQuestion?.cite } </Typography> }
        { ( currentQuestion?.comodin_call_used && !currentQuestionProceed) && <Typography variant="body1" component="p">
            Tienes la oportunidad de preguntarle a alguien dentro de la sala o
            fuera de la sala.
          </Typography> }
        </Grid2>
        <Grid2 size={4} sx={{ display: 'flex', justifyContent: 'end' }}>
            { ( isAnswerCorrect && currentQuestionProceed) && <Box sx={{  width: '150px' }} >  <img src="/assets/feliz.gif" alt="Feliz" /></Box> }
            { ( !isAnswerCorrect && currentQuestionProceed ) && <Box sx={{  width: '150px' }} ><img src="/assets/triste.gif" alt="Triste" /></Box> }
        </Grid2>
      </Grid2>
    </>
  );
};
