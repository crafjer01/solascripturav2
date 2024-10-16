import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid2 } from '@mui/material';
import { Question } from './Question';
import { NavigationButtons } from './NavigationButtons';
import { ParticipantPanel } from './ParticipantPanel';

import { repositoryQuestions } from '../../data/repositoryQuestions';
import { saveCurrentParticipant } from '../../helpers/helpers';
import { MessageAlert } from './MessageAlert';
import { Description } from '@mui/icons-material';


let roundCounter = 1
let participantRound = 1;
let questionCounter = 1;
let participantCounter = 0;

export const Game = ({ game, setGame }) => {
    const { roundsQuantity, participants, secondAnswer, questionsQuantity } = game;
    const [ currentParticipant, setCurrentParticipant ] = useState({
        name: '',
        answered: 0,
        guess: 0,
        fail: 0,
        skip: 0
    });

    const [ currentSecondAnswer, setCurrentSecondAnswer ] = useState(secondAnswer);
    const [ currentQuestion, setCurrentQuestion ] = useState(null);
    const [ questions, setQuestions ] = useState(repositoryQuestions);
    const [ comodin, setComodin ] = useState({
        _5050: false,
        cite: false,
        call: false
    });
    const [ isAnswerCorrect, setIsAnswerCorrect ] = useState(false);
    const [ answerSelected, setAnswerSelected ] = useState('');
    const [ currentQuestionProceed, setCurrentQuestionProceed ] = useState(false);
    const [ openMessage, setOpenMessage ] = useState(false);

    useEffect(() => {
        setCurrentParticipant({
            ...currentParticipant,
            name: participants[participantCounter]
        });
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('participants', JSON.stringify([]));
        setCurrentQuestion( repositoryQuestions[0] );

    }, []);

    
    const onSelectAnswer = (answer) => {
        setAnswerSelected(answer);
        setCurrentSecondAnswer(0);
    }

    const hasQuestions =  questions.length > 0;

    const isLastQuestion = questionCounter < questionsQuantity;

    const getNextQuestion = () => {
        questionCounter = questionCounter + 1;
        setCurrentSecondAnswer(secondAnswer);
        setAnswerSelected('');
        setCurrentQuestionProceed(false);
        setCurrentQuestion(questions[0]);
    }

    const hasParticipants = participantRound < participants.length;

    const getNextParticipant = () => {
        saveCurrentParticipant(currentParticipant);
        // Resetea los contadores 
        participantRound = participantRound + 1;
        participantCounter = participantCounter + 1;
        questionCounter = 1;
        setCurrentSecondAnswer(secondAnswer);
        setAnswerSelected('');
        setComodin({ _5050: false,cite: false,call: false }); 
        setCurrentParticipant({ 
            name: participants[participantCounter], 
            answered: 0, 
            guess: 0,
            fail: 0,
            skip: 0 
        });
        setCurrentQuestionProceed(false);
        setCurrentQuestion(questions[0]);
    }

    const hasRounds = roundCounter < roundsQuantity;

    const getNextRound = () => {
        saveCurrentParticipant(currentParticipant);
        roundCounter = roundCounter + 1;
        participantRound = 1;
        participantCounter = 0; 
        questionCounter = 1;
        setCurrentSecondAnswer(secondAnswer);
        setAnswerSelected('');
        setComodin({ _5050: false, cite: false, call: false });                                     
        setCurrentParticipant({ 
            name: participants[participantCounter], 
            answered: 0, 
            guess: 0,
            fail: 0,
            skip: 0 
        });
        setCurrentQuestionProceed(false);
        setCurrentQuestion(questions[0]);
    }

    const finalizeGame = () => {
        saveCurrentParticipant(currentParticipant);
        setGame({
            ...game,
            end: true
        });
        alert('Fin del juego');
    }

    const nextRound = () => {
        if ( hasRounds ) {
            getNextRound();
        } else {
            finalizeGame();
        }
    }

    const nextParticipant = () => {
        if ( hasParticipants ) {
            setOpenMessage(true);
            getNextParticipant();
            
        } else {
           nextRound();
        }
    }

    const onNextQuestion = () => {
        if ( hasQuestions ) {
            if ( isLastQuestion ) {                  
                getNextQuestion();
            } else {
                nextParticipant();
            }
        }
    }

    const myMessageAlert = {
        title: 'Preguntas completadas',
        description: `La ronda ha finalizado para el jugador ${currentParticipant.name}. ¿Desea pasar a la siguiente ronda?` 
    }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
        <MessageAlert
            message={myMessageAlert}
            openMessage={openMessage} 
            setOpenMessage={setOpenMessage}
            currentParticipant={currentParticipant}
        />
        <Paper sx={{ p: 2 }}>
            {/*  */}
            <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Juego en curso</Typography>
            <Grid2 container spacing={2}>
                <ParticipantPanel 
                    currentParticipant={ currentParticipant } 
                    roundCounter={ roundCounter }
                />
                <Grid2 size={8} >
                   
                    {/* Question */}
                    <Question 
                        currentQuestion={currentQuestion} 
                        setCurrentQuestion={ setCurrentQuestion }
                        currentSecondAnswer={currentSecondAnswer} 
                        setCurrentSecondAnswer={setCurrentSecondAnswer}  
                        comodin={comodin}
                        setComodin={setComodin} 
                        setIsAnswerCorrect={setIsAnswerCorrect}
                        onSelectAnswer={onSelectAnswer}
                        answerSelected={answerSelected}
                        setAnswerSelected={setAnswerSelected}
                        isAnswerCorrect={isAnswerCorrect}                        
                        questions={ questions }
                        setQuestions={ setQuestions }
                        currentQuestionProceed={currentQuestionProceed}
                        setCurrentQuestionProceed={ setCurrentQuestionProceed }
                        currentParticipant={currentParticipant}
                        setCurrentParticipant={setCurrentParticipant}
                    />
                    <NavigationButtons 
                        onNextQuestion={ onNextQuestion }
                        answerSelected={ answerSelected }  
                        participants={ participants }
                        roundsQuantity={ roundsQuantity }
                        roundCounter={ roundCounter }
                        questionCounter={ questionCounter }
                        questionsQuantity={questionsQuantity}
                    />
                     
                </Grid2>
            </Grid2>
        </Paper>
    </Container>

  )
}
