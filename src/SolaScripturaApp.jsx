import { useEffect, useState } from 'react'
import { Home } from './components/home/Home'
import { Navbar } from './components/navbar/Navbar'
import { Form } from './components/form/Form';

import { AppTheme } from './theme/AppTheme'
import { Preloading } from './components/preloading/Preloading';
import { Game } from './components/game/Game';
import { FinalPanel } from './components/game/FinalPanel';
import { useSelector } from 'react-redux';


export const SolaScripturaApp = () => {
  const { isGameStarted, isGameEnd, isFormOpen } = useSelector(state => state.game)
  const [game, setGame] = useState({
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

  return (
    <AppTheme>
        { preloading && <Preloading /> }
        <Navbar />
        { (!isFormOpen && !isGameStarted) && <Home /> } 
        { (isFormOpen && !isGameStarted) && <Form /> }
        { (isGameStarted && !isGameEnd) && <Game /> }
        { (isGameEnd) && <FinalPanel /> }
    </AppTheme>
  )
}
