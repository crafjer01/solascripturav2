import { Box, AppBar, Toolbar,Typography, Button, Container } from "@mui/material";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ width: '60px', mr: 2 }}>
            <img src="/assets/logo.png" alt="logo" />
          </Box>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            SolaScriptura
          </Typography>
          <Button color="inherit">Reglas</Button>
          <Button color="inherit">Info</Button>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
