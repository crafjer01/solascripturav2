import { Container, Paper, Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Button, Tooltip } from '@mui/material';
import { useCounter } from '../../hooks/useCounter';
import { useEffect, useReducer, useState } from 'react';
import { Question } from './Question';
import { repositoryQuestions } from '../../data/repositoryQuestions';
import { questionReducer } from './questionReducer';
import { NavigationButtons } from './NavigationButtons';

const init = () => {
    return repositoryQuestions;
}

export const Game = ({ game, setGame }) => {
    const { roundsQuantity, participants, secondAnswer, questionsQuantity } = game;

    const { counter: roundCounter, increment: incrementRoundCounter } = useCounter(1);
    const { counter: participantCounter, increment: incrementParticipantCounter, reset: resetParticipantCounter } = useCounter(0);
    const { counter: questionCounter, increment: incrementQuestionCounter, reset: resetQuestionCounter } = useCounter(1);
    const { counter: participantRound, increment: incrementParticipantRound, reset: resetParticipantRound } = useCounter(1);
    
    const [ currentParticipant, setCurrentParticipant ] = useState();
    const [ currentSecondAnswer, setCurrentSecondAnswer ] = useState(secondAnswer);
    const [ currentQuestion, setCurrentQuestion ] = useState(null);
    const [ questions, dispatch ] = useReducer(questionReducer, [], init);
    const [ comodin, setComodin ] = useState({
        _5050: false,
        cite: false,
        call: false
    });
    const [ isAnswerCorrect, setIsAnswerCorrect ] = useState(false);
    const [ answerSelected, setAnswerSelected ] = useState('');


   


    useEffect(() => {
        setCurrentParticipant(participants[participantCounter]);
        setCurrentQuestion(questions[0]);
    }, [ questions ]);

    
  const onSelectAnswer = (answer) => {
    setAnswerSelected(answer);
    setCurrentSecondAnswer(0);
  }

    const onNextQuestion = () => {
        if ( questions.length > 0 ) {
                
            const proceedAction = {
                type: 'PROCEED_QUESTION',
                payload: { id: currentQuestion.id, proceed: true }
            };
            dispatch(proceedAction);
        
            if ( questionCounter < questionsQuantity ) {                  
                    incrementQuestionCounter();
                    const GetAction = {
                        type: 'GET_QUESTION',
                    }        
                    dispatch(GetAction);
                    setCurrentSecondAnswer(secondAnswer);
                    setCurrentQuestion[0];
                    setAnswerSelected('');
                
            } else {
                const GetAction = {
                    type: 'GET_QUESTION',
                }        
                dispatch(GetAction);

                if ( participantRound === participants.length ) {
                    incrementRoundCounter();
                    setCurrentQuestion[0];
                    setCurrentSecondAnswer(secondAnswer);
                    resetQuestionCounter();
                    resetParticipantCounter();
                    resetParticipantRound();
                    setComodin({
                        _5050: false,
                        cite: false,
                        call: false
                    });
                    setAnswerSelected('');

                    setCurrentParticipant[participantCounter];
                } else {
                    incrementParticipantRound();
                    setComodin({
                        _5050: false,
                        cite: false,
                        call: false
                    });
                    setCurrentQuestion[0];
                    resetQuestionCounter();
                    setCurrentSecondAnswer(secondAnswer);
    
                    incrementParticipantCounter();
                    setCurrentParticipant[participantCounter];
                }
                
            }
        }
    }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper sx={{ p: 2 }}>
            {/*  */}
            <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Juego en curso</Typography>
            <Grid2 container spacing={2}>
                <Grid2 container spacing={2} size={4} sx={{ flexDirection: 'column', justifyContent: 'space-between',  borderRight: '3px solid #00838f', borderRadius: '3px', }}>
                    <Grid2>
                        <Typography variant='h6' component="h2"><b>Participante:</b> {currentParticipant} </Typography>
                    </Grid2>
                    <Grid2>                        
                        <Typography variant='h6' component="h2"><b>Ronda #:</b> { roundCounter }</Typography>
                        <Typography variant='h6' component="h2"><b>Rondas Canceladas:</b> 0</Typography>
                    </Grid2>
                </Grid2>
                <Grid2 size={8} >
                   
                    {/* Question */}
                    <Question 
                        question={currentQuestion} 
                        currentSecondAnswer={currentSecondAnswer} 
                        setCurrentSecondAnswer={setCurrentSecondAnswer}  
                        comodin={comodin}
                        setComodin={setComodin} 
                        setIsAnswerCorrect={setIsAnswerCorrect}
                        onSelectAnswer={onSelectAnswer}
                        answerSelected={answerSelected}
                        setAnswerSelected={setAnswerSelected}
                    />
                    <NavigationButtons 
                        onNextQuestion={ onNextQuestion }
                        participants={ participants }
                        roundsQuantity={ roundsQuantity }
                        roundCounter={ roundCounter }
                    />
                     
                </Grid2>
            </Grid2>
        </Paper>
    </Container>

  )
}
