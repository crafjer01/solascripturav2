import { Container, Paper, Typography, Grid2 } from '@mui/material';

export const Game = ({ game, setGame }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper sx={{ p: 2 }}>
        <Typography variant='h5' component="h2" sx={{ textAlign: 'center', mb: 3 }}>Juego en curso</Typography>
            <Grid2 container spacing={2}>
            </Grid2>
        </Paper>
    </Container>

  )
}
