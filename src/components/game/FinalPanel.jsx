import { Container, Paper, Typography } from '@mui/material';
import { calculateParticipantScores, determineWinner } from '../../helpers/helpers';
import { GameResult } from './GameResult';

export const FinalPanel = () => {

    const participantsWithScores = calculateParticipantScores();
    const ganador = determineWinner(participantsWithScores);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Paper sx={{ p: 2 }}>
            <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Juego finalizado</Typography>

            <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>{ ganador } </Typography>

            <GameResult  />
        </Paper>
    </Container>
  )
}
