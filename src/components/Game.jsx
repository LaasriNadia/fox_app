import React, { useState, useEffect } from 'react';

const Game = ({ scene }) => {
  const [gameState, setGameState] = useState('day');

  useEffect(() => {
    switch (scene) {
      case 2:
        setGameState('night');
        break;
      case 1:
        setGameState('rain');
        break;
      case 3:
        setGameState('dead');
        break;
      default:
        setGameState('day');
        break;
    }
  }, [scene]);
  return <div className={`game ${gameState}`}></div>;
};

export default Game;
