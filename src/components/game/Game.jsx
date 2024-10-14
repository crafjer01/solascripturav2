import { Container, Paper, Typography, Grid2 } from '@mui/material';
import { useEffect, useState } from 'react';
import { Question } from './Question';
import { repositoryQuestions } from '../../data/repositoryQuestions';
import { NavigationButtons } from './NavigationButtons';
import { ParticipantPanel } from './ParticipantPanel';
import { saveCurrentParticipant } from '../../helpers/helpers';

const init = () => {
    return repositoryQuestions;
}

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

    const onNextQuestion = () => {
        if ( questions.length > 0 ) {
            
            // Siguiente pregunta y actualiza la lista de preguntas
            if ( questionCounter < questionsQuantity ) {                  
                questionCounter = questionCounter + 1;
                setCurrentSecondAnswer(secondAnswer);
                setAnswerSelected('');
                setCurrentQuestionProceed(false);
                setCurrentQuestion(questions[0]);
                
            } else {
                // Siguiente Participante de la ronda
                if ( participantRound < participants.length ) {
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
                } else {
                    // Siguiente ronda
                    if ( roundCounter < roundsQuantity ) {
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
                    } else {
                        // Finalizar el juego
                        saveCurrentParticipant(currentParticipant);
                        setGame({
                            ...game,
                            end: true
                        });
                        alert('Fin del juego');
                    }
                   
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
                    />
                     
                </Grid2>
            </Grid2>
        </Paper>
    </Container>

  )
}
