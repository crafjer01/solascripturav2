import { Grid2, Box, Container, Typography, Button } from '@mui/material';

export const Home = ({ game, setGame }) => {

  const onStart = () => {
    setGame({
      ...game,
      formStarted: true
    });
  }
  return (
    <Container maxWidth="xl">
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Box sx={{ mt: 7 }}>
            <Typography variant="h3" component="h1" sx={{ color: '#444' }}>¿Qué sabes de la Biblia?</Typography>
            <Typography variant='body1' component="p" sx={{ mt: 2, color: '#666' }}>
              Pese a que es el libro más vendido en el mundo, no debemos tomar su lectura a la ligera.
              Es importante leerla, estudiarla, practicarla y compartirla; de modo que tengamos una mejor relación con los demás,
              y un vínculo estrecho con Dios.
            </Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography variant="h3" component="h1" sx={{ color: '#444' }}>SolaScriptura</Typography>
            <Typography variant='body1' component="p" sx={{ color: '#666' }}>
              Llega para que puedas divertirte junto a otros mientras aprenden de la palabra de Dios.
            </Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Button variant="contained"
              onClick={ onStart }
            >Iniciar</Button>
          </Box>
        </Grid2>
        <Grid2 size={6} >
          <Box>
            <img src="/assets/logo.png" alt="SolaScriptura" />
          </Box>
        </Grid2>
      </Grid2>
      </Container>
      );
};
