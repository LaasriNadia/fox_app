import React, { useState, useEffect } from 'react';
import './styles.css';
import Game from './components/Game';
import Fox from './components/Fox';
import Rain from './components/Rain';
import Frame from './components/Frame';
import Modal from './components/Modal';

const App = () => {
  useEffect(() => {
    checkTime();

    const intervalId = setInterval(tick, TICK_RATE);

    return () => clearInterval(intervalId);
  });

  const TICK_RATE = 3000;

  const checkTime = () => {
    if (clock === wakeTime) {
      wake();
    } else if (clock === sleepTime) {
      sleep();
    } else if (clock === hungryTime) {
      getHungry();
    } else if (clock === dieTime) {
      die();
    } else if (clock === timeToStartCelebrating) {
      startCelebrating();
    } else if (clock === timeToEndCelebrating) {
      endCelebrating();
    } else if (clock === poopTime) {
      poop();
    }
  };

  function tick() {
    incrementClock();
  }

  const [current, setCurrent] = useState('INIT');
  const [clock, setClock] = useState(1);
  const [scene, setScene] = useState(0);
  const [wakeTime, setWakeTime] = useState(-1);
  const [sleepTime, setSleepTime] = useState(-1);
  const [hungryTime, setHungryTime] = useState(-1);
  const [dieTime, setDieTime] = useState(-1);
  const [poopTime, setPoopTime] = useState(-1);
  const [timeToStartCelebrating, setTimeToStartCelebrating] = useState(-1);
  const [timeToEndCelebrating, setTimeToEndCelebrating] = useState(-1);
  const [togglePoopBag, setTogglePoopBag] = useState(-1);
  const ICONS = ['fish-icon', 'poop-icon', 'weather-icon'];
  const [selectedIcon, setSelectedIcon] = useState(0);
  const RAIN_CHANCE = 0.6;
  const DAY_LENGTH = 60;
  const NIGHT_LENGTH = 3;
  const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 5 + clock;
  const getNextDieTime = clock => Math.floor(Math.random() * 2) + 3 + clock;
  const getNextPoopTime = clock => Math.floor(Math.random() * 3) + 4 + clock;

  const clearTimes = () => {
    setWakeTime(-1);
    setSleepTime(-1);
    setHungryTime(-1);
    setDieTime(-1);
    setPoopTime(-1);
    setTimeToEndCelebrating(-1);
    setTimeToStartCelebrating(-1);
  };
  const wake = () => {
    setCurrent('IDLING');
    setWakeTime(-1);
    setScene(Math.random() > RAIN_CHANCE ? 0 : 1);
    setSleepTime(clock + DAY_LENGTH);
    setHungryTime(getNextHungerTime(clock));
  };

  const startGame = () => {
    setCurrent('HATCHING');
    setWakeTime(clock + 3);
    setScene(0);
  };

  const incrementClock = () => {
    setClock(clock + 1);
  };

  const sleep = () => {
    setCurrent('SLEEPING');
    setScene(2);
    clearTimes();
    setTogglePoopBag(false);
    setWakeTime(clock + NIGHT_LENGTH);
  };

  const changeWeather = () => {
    setScene((1 + scene) % 2);
  };
  const cleanUpPoop = () => {
    setDieTime(-1);
    setTogglePoopBag(true);
    setCurrent('CELEBRATING');
    setTimeToStartCelebrating(-1);
    setTimeToEndCelebrating(clock + 2);
    setHungryTime(getNextHungerTime(clock));
  };
  const feed = () => {
    setCurrent('FEEDING');
    setDieTime(-1);
    setPoopTime(getNextPoopTime(clock));
    setTimeToStartCelebrating(clock + 2);
  };

  function selectPrev() {
    const selected = (2 + selectedIcon) % ICONS.length;
    setSelectedIcon(selected);
  }

  function selectNext() {
    const selected = (1 + selectedIcon) % ICONS.length;
    setSelectedIcon(selected);
  }
  const getHungry = () => {
    setCurrent('HUNGRY');
    setDieTime(getNextDieTime(clock));
    setHungryTime(-1);
  };
  const die = () => {
    setCurrent('DEAD');
    setScene(3);
    clearTimes();
  };
  const startCelebrating = () => {
    setCurrent('CELEBRATING');
    setTimeToStartCelebrating(-1);
    setTimeToEndCelebrating(clock + 2);
  };
  const endCelebrating = () => {
    setTimeToEndCelebrating(-1);
    setCurrent('IDLING');
    setTogglePoopBag(false);
  };
  const poop = () => {
    setCurrent('POOPING');
    setPoopTime(-1);
    setDieTime(getNextDieTime(clock));
  };
  const handleUserAction = icon => {
    if (['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(current)) {
      return;
    }

    if (current === 'INIT' || current === 'DEAD') {
      startGame();
      return;
    }

    switch (icon) {
      case 'weather-icon':
        if (current !== 'DEAD' || current !== 'SLEEPING') changeWeather();
        break;
      case 'poop-icon':
        if (current === 'POOPING') {
          cleanUpPoop();
        }
        break;
      case 'fish-icon':
        if (current === 'HUNGRY') {
          feed();
        }
        break;

      default:
    }
  };

  return (
    <div className='container'>
      <div className='inner'>
        <Game scene={scene} />
        <Fox current={current} />
        <div
          className={togglePoopBag === true ? 'poop-bag  ' : 'poop-bag hidden'}
        ></div>
        <Rain />
        <Frame />
        <Modal current={current} />
        <div className='buttons'>
          <button className='btn left-btn' onClick={selectPrev}></button>
          <button
            className='btn middle-btn'
            onClick={() => handleUserAction(ICONS[selectedIcon])}
          ></button>
          <button className='btn right-btn ' onClick={selectNext}></button>
        </div>
        <div className='icons'>
          <div
            className={
              selectedIcon === 0
                ? 'icon fish-icon highlighted '
                : 'icon fish-icon'
            }
          ></div>
          <div
            className={
              selectedIcon === 1
                ? 'icon poop-icon highlighted '
                : 'icon poop-icon'
            }
          ></div>
          <div
            className={
              selectedIcon === 2
                ? 'icon weather-icon highlighted '
                : 'icon weather-icon'
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
