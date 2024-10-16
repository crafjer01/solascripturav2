import { useEffect, useState } from 'react'
import { Home } from './components/home/Home'
import { Navbar } from './components/navbar/Navbar'
import { Form } from './components/form/Form';

import { AppTheme } from './theme/AppTheme'
import { Preloading } from './components/preloading/Preloading';
import { Game } from './components/game/Game';
import { FinalPanel } from './components/game/FinalPanel';


export const SolaScripturaApp = () => {
  const [game, setGame] = useState({
    formStarted: false,
    started: false,
    end: false,
    secondAnswer: 30,
    questionsQuantity: 5,
    roundsQuantity: null,
    participants: []
  });
  const [ preloading, setPreloading ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, 9500);
  }, []);

  const { formStarted, started, end } = game;

  return (
    <AppTheme>
        { preloading && <Preloading /> }
        <Navbar />
        { (!formStarted && !started) && <Home game={game} setGame={setGame} /> } 
        { (formStarted && !started) && <Form game={game} setGame={setGame} /> }
        { (started && !end) && <Game game={game} setGame={setGame} /> }
        { (end) && <FinalPanel /> }
    </AppTheme>
  )
}
