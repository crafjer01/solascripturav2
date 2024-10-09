import { Container, Paper, Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Button, Tooltip } from '@mui/material';
import { useCounter } from '../../hooks/useCounter';
import { useEffect, useReducer, useState } from 'react';
import { Question } from './Question';
import { repositoryQuestions } from '../../data/repositoryQuestions';
import { questionReducer } from './questionReducer';

const init = () => {
    return repositoryQuestions;
}

export const Game = ({ game, setGame }) => {
    const { counter: roundCounter } = useCounter(1);
    const { counter: participantCounter } = useCounter(0);
    
    const [ currentParticipant, setCurrentParticipant ] = useState();
    const [ question, setQuestion ] = useState(null);
    const [ questions, dispatch ] = useReducer(questionReducer, [], init);


    const { roundsQuantity, participants, secondAnswer } = game;

    const { counter: secondAnswerCounter, decrement: decrementSecondAnswer } = useCounter(secondAnswer);

    useEffect(() => {
        setCurrentParticipant(participants[participantCounter]);
        setQuestion(questions[0]);
    }, []);

    useEffect(() => {
        if (secondAnswerCounter > 0) {
            setTimeout(() => {
                decrementSecondAnswer();
            }, 1000)
        }
       ;
    }, [ secondAnswerCounter ]);

  

    

    // setting game 
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper sx={{ p: 2 }}>
            {/*  */}
            <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Juego en curso</Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={4} sx={{ borderRight: '3px solid #00838f', borderRadius: '3px' }}>
                    <Typography variant='h6' component="h2"><b>Participante:</b> {currentParticipant} </Typography>
                    <Typography variant='h6' component="h2"><b>Ronda #:</b> { roundCounter }</Typography>
                    {/* <Typography variant='h6' component="h2"><b>Rondas Canceladas:</b> 0</Typography> */}
                </Grid2>
                <Grid2 size={8} >
                   
                    {/* Question */}
                    <Question question={question} secondAnswerCounter={secondAnswerCounter} />

                    {/* Answer results and Navigate Buttons */}
                    <Grid2 container sx={{ pt: 2, borderTop: '4px solid #ccc'}}>
                        <Grid2 size={12}>
                            <Typography variant="body1" component="p">Genial la repuesta correcta es </Typography>
                            <Typography variant="body1" component="p">Lo siento la repuesta correcta es </Typography>
                            <Typography variant="body1" component="p">Cita Biblica:</Typography>
                            <Typography variant="body1" component="p">Tienes la oportunidad de preguntarle a alguien dentro de la sala o fuera de la sala.</Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button variant="contained" sx={{ mr: 1 }}>Siguiente</Button>
                                <Button variant="contained" sx={{ mr: 1 }}>Pasar pregunta</Button>
                                <Button variant="contained" sx={{ mr: 1 }}>Retirar Participante</Button>
                                <Button variant="contained">Cancelar Ronda</Button>
                            </Box>
                            
                        </Grid2>
                    </Grid2>

                </Grid2>
            </Grid2>
        </Paper>
    </Container>

  )
}
