import { Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Tooltip } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import { AnswerOption } from './AnswerOption';
import { useEffect, useRef } from 'react';

export const Question = ({question, currentSecondAnswer, setCurrentSecondAnswer, comodin, setComodin, answerSelected, setIsAnswerCorrect, onSelectAnswer }) => {
  const {_5050, call, cite} = comodin;

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (currentSecondAnswer > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSecondAnswer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); 
      }
    };
  }, [currentSecondAnswer]);

  
  return (
    <>
      {/* Question */}
      <Typography variant="h5" component="h2">{ question?.description }</Typography>
      
      {/* Answwers list and Clock */}
      <Grid2
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "space-between" }}
      >
        <Grid2 size={8}>
        <FormGroup>
            <RadioGroup
              aria-labelledby="answer-radio-buttons"
              name="answer-radio-buttons"
            >
                { question?.answers.map(answer => (
                    <AnswerOption 
                        key={answer.description} 
                        answer={answer}  
                        onSelectAnswer={onSelectAnswer} 
                        answerSelected={answerSelected}
                        setIsAnswerCorrect={setIsAnswerCorrect} 
                    />
                )) }
            </RadioGroup>
          </FormGroup>
        </Grid2>
        <Grid2 size={4}>
          <Grid2
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              height: "100%",
              p: 2,
            }}
          >
            <Box className="clock" sx={{ background: "#00838f" }}>
              { currentSecondAnswer }
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Comodins */}
      <Grid2
        container
        spacing={2}
        sx={{ justifyContent: "end", alignItems: "center", mb: 2 }}
      >
        <Grid2>
          <Tooltip title="Cita bibilica">
            <Fab
              size="small"
              color="primary"
              aria-label="cite-bible"
              sx={{ mr: 1 }}
              onClick={() => {
                setComodin({...comodin,  cite: true });
              }}
              disabled={ cite }
            >
              <ImportContactsIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Llamar un amigo">
            <Fab
              size="small"
              color="secondary"
              aria-label="call-a-friend"
              sx={{ mr: 1 }}
              onClick={() => {
                setComodin({...comodin,  call: true });
              }}
              disabled={ call }
            >
              <SmartphoneIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="50/50">
            <Fab
              size="small"
              color="error"
              aria-label="fifty-fifty"
              sx={{ mr: 1 }}
              onClick={() => {
                setComodin({...comodin,  _5050: true });
              }}
              disabled={ _5050 }
            >
              <ExploreOffIcon />
            </Fab>
          </Tooltip>
        </Grid2>
      </Grid2>
    </>
  );
};
