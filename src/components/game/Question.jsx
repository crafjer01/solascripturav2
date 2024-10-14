import { Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Tooltip } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import { AnswerOption } from './AnswerOption';
import { useEffect, useRef, useState } from 'react';
import { AnswerResult } from './AnswerResult';

export const Question = ({
  currentQuestion, currentSecondAnswer, setCurrentSecondAnswer, comodin, setComodin, 
  answerSelected, setIsAnswerCorrect, onSelectAnswer, isAnswerCorrect,
  setCurrentQuestion, questions, setQuestions, currentQuestionProceed, setCurrentQuestionProceed,
  currentParticipant, setCurrentParticipant
}) => {    

  const {_5050, call, cite} = comodin;
  const timeoutRef = useRef(null);

  const answers = currentQuestion?.answers;

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


  const useComodinCite = () => {
    setComodin({...comodin,  cite: true });
    currentQuestion.comodin_cite_used = true;
  }

  const useComodinCall = () => {
    setComodin({...comodin,  call: true });
    currentQuestion.comodin_call_used = true;
  }

  const useComodin5050 = () => {
    setComodin({...comodin,  _5050: true });
    currentQuestion.comodin_500_used = true;
  }

  
  return (
    <>
      {/* Question */}
      <Typography variant="h5" component="h2">{ currentQuestion?.description }</Typography>
      
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
                { answers?.map(answer => (
                    <AnswerOption 
                        key={answer.description} 
                        answer={answer}  
                        onSelectAnswer={onSelectAnswer} 
                        answerSelected={answerSelected}
                        setIsAnswerCorrect={setIsAnswerCorrect}
                        currentQuestion={ currentQuestion }
                        setCurrentQuestion={ setCurrentQuestion }
                        questions={ questions }
                        setQuestions={ setQuestions }
                        setCurrentQuestionProceed={setCurrentQuestionProceed}
                        currentParticipant={ currentParticipant }
                        setCurrentParticipant={ setCurrentParticipant } 
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
              onClick={ useComodinCite }
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
              onClick={ useComodinCall }
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
              onClick={ useComodin5050 }
              disabled={ _5050 }
            >
              <ExploreOffIcon />
            </Fab>
          </Tooltip>
        </Grid2>
      </Grid2>
      
      <AnswerResult 
        isAnswerCorrect={isAnswerCorrect}
        answerSelected={ answerSelected }
        currentQuestion={currentQuestion}
        comodinCall={ call }
        comodinCite={ cite }
        currentQuestionProceed={currentQuestionProceed}
      />
    </>
  );
};
