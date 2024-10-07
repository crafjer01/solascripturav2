import { useEffect, useState } from 'react'
import { Home } from './components/home/Home'
import { Navbar } from './components/navbar/Navbar'
import { Form } from './components/form/Form';

import { AppTheme } from './theme/AppTheme'
import { Preloading } from './components/preloading/Preloading';


export const SolaScripturaApp = () => {
  const [game, setGame] = useState({
    started: false,
  });
  const [ preloading, setPreloading ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, 9500);
  }, []);

  const { started } = game;

  return (
    <AppTheme>
        { preloading && <Preloading /> }
        <Navbar />
        { 
          (!started) 
          ? <Home game={game} setGame={setGame} /> 
          : <Form game={game} setGame={setGame} />
        } 
    </AppTheme>
  )
}
