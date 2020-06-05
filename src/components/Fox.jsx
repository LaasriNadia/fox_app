import React, { useState, useEffect } from 'react';

const Fox = ({ current, scene }) => {
  const [classState, setClasseState] = useState('hidden');

  useEffect(() => {
    switch (current) {
      case 'IDLING':
        if (scene === 1) {
          setClasseState('fox-idling');
        } else {
          setClasseState('fox-rain');
        }
        break;
      case 'HATCHING':
        setClasseState('fox-egg');
        break;
      case 'DEAD':
        setClasseState('fox-dead');
        break;
      case 'SLEEPING':
        setClasseState('fox-sleep');
        break;
      case 'HUNGRY':
        setClasseState('fox-hungry');
        break;
      case 'FEEDING':
        setClasseState('fox-eating');
        break;
      case 'CELEBRATING':
        setClasseState('fox-celebrate');
        break;
      case 'POOPING':
        setClasseState('fox-pooping');
        break;
    }
  }, [current, scene]);

  return <div className={`fox ${classState}`}> </div>;
};

export default Fox;
