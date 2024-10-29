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
   // Redux state
  const { isGameStarted, isGameEnd, isFormOpen } = useSelector(state => state.game)
  const [ preloading, setPreloading ] = useState(true);

   // Handle initial loading
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      setPreloading(false);
    }, 9500);

    // Cleanup timeout to prevent memory leaks
    return () => clearTimeout(preloadTimer);
  }, []);

   // Render different components based on game state
   const renderGameState = () => {
    if (preloading) return <Preloading />;
    if (isFormOpen && !isGameStarted) return <Form />;
    if (isGameStarted && !isGameEnd) return <Game />;
    if (isGameEnd) return <FinalPanel />;
    return <Home />;
  };

  return (
    <AppTheme>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
          { renderGameState() }
          </main>
        </div>
    </AppTheme>
  )
}
