import { useState } from 'react'
import { Home } from './components/home/Home'
import { Navbar } from './components/navbar/Navbar'
import { Form } from './components/form/Form';

export const SolaScripturaApp = () => {
  const [game, setGame] = useState({
    started: false
  });
  const { started } = game;

  return (
    <>
        <Navbar />
        { 
          (!started) 
          ? <Home game={game} setGame={setGame} /> 
          : <Form game={game} setGame={setGame} />
        } 
    </>
  )
}
