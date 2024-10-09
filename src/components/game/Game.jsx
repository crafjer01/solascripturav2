import { Container, Paper, Typography, Grid2, FormGroup, RadioGroup, FormControlLabel, Box, Radio, Fab, Button, Tooltip } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import { useCounter } from '../../hooks/useCounter';
import { memo, useEffect, useState } from 'react';

export const Game = ({ game, setGame }) => {
    const { counter: roundCounter } = useCounter(1);
    const { counter: participantCounter } = useCounter(0);
    
    const [ currentParticipant, setCurrentParticipant ] = useState();

    const { roundsQuantity, participants, secondAnswer } = game;

    const { counter: secondAnswerCounter, decrement: decrementSecondAnswer } = useCounter(secondAnswer);

    useEffect(() => {
        setCurrentParticipant(participants[participantCounter]);
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
                    <Typography variant='h5' component="h2" >
                        Cual es el libro mas antigo?
                    </Typography>
                    {/* Answwers list and Clock */}
                    <Grid2 container spacing={2} sx={{ mt: 2, justifyContent: 'space-between' }}>
                        <Grid2 size={8} >
                            <FormGroup>
                                <RadioGroup 
                                    aria-labelledby="answer-radio-buttons"
                                    name="answer-radio-buttons"
                                >
                                    <FormControlLabel value="a" control={<Radio />} label="Genesis" />
                                    <FormControlLabel value="b" control={<Radio />} label="Salmo" />
                                    <FormControlLabel value="c" control={<Radio />} label="Apocalisi" />
                                    <FormControlLabel value="d" control={<Radio />} label="Marcos" />
                                </RadioGroup>
                            </FormGroup>
                        </Grid2>
                        <Grid2 size={4} >
                            <Grid2   sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 2 }}>
                                <Box className="clock" sx={{ background:  '#00838f'}}>
                                    { secondAnswerCounter }
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Grid2>

                    {/* Comodins */}
                    <Grid2 container spacing={2} sx={{ justifyContent: 'end', alignItems: 'center', mb: 2}}>
                        <Grid2 size={12}  >
                            <Tooltip title="Cita bibilica">
                                <Fab size="small" color="primary" aria-label="cite-bible" sx={{ mr: 1 }}>
                                    <ImportContactsIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Llamar un amigo">
                                <Fab size="small" color="secondary" aria-label="call-a-friend" sx={{ mr: 1 }}>
                                    <SmartphoneIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="50/50">
                                <Fab size="small" color="error" aria-label="fifty-fifty" sx={{ mr: 1 }}>
                                    <ExploreOffIcon />
                                </Fab>
                            </Tooltip>
                        </Grid2>
                    </Grid2>

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
                                <Button variant="contained" sx={{ mr: 1 }}>Siguiente Ronda</Button>
                                <Button variant="contained" sx={{ mr: 1 }}>Pasar pregunta</Button>
                                <Button variant="contained" sx={{ mr: 1 }}>Cancelar Ronda</Button>
                                <Button variant="contained">Siguiente Ronda</Button>
                            </Box>
                            
                        </Grid2>
                    </Grid2>

                </Grid2>
            </Grid2>
        </Paper>
    </Container>

  )
}
