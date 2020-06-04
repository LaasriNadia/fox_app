import React, { useState, useEffect } from 'react';
// import initButtons from '../init.js';
import {
  ICONS,
  modFox,
  modScene,
  togglePoopBag,
  writeModal,
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
  TICK_RATE,
  getNextPoopTime
} from '../utils';

const Buttons = () => {
  const [current, setCurrent] = useState('INIT');
  const [wakeTime, setWakeTime] = useState(-1);
  const [clock, setClock] = useState(1);
  const [sleepTime, setSleepTime] = useState(-1);
  const [hungryTime, setHungryTime] = useState(-1);
  const [dieTime, setDieTime] = useState(-1);
  const [poopTime, setPoopTime] = useState(-1);
  const [timeToStartCelebrating, setTimeToStartCelebrating] = useState(-1);
  const [timeToEndCelebrating, setTimeToEndCelebrating] = useState(-1);
  const [scene, setscene] = useState(0);

  useEffect(() => {
    console.log(current);
    console.log('starting game');

    buttonClick();
    let nextTimeToTick = Date.now();

    function nextAnimationFrame() {
      const now = Date.now();
      if (nextTimeToTick <= now) {
        tick();
        nextTimeToTick = now + TICK_RATE;
      }
      requestAnimationFrame(nextAnimationFrame);
    }

    nextAnimationFrame();
  }, []);

  const toggleHighlighted = (icon, show) =>
    document
      .querySelector(`.${ICONS[icon]}-icon`)
      .classList.toggle('highlighted', show);

  let selectedIcon = 0;
  const buttonClick = e => {
    if (e) {
      if (e.target.classList.contains('left-btn')) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (2 + selectedIcon) % ICONS.length;
        toggleHighlighted(selectedIcon, true);
      } else if (e.target.classList.contains('right-btn')) {
        toggleHighlighted(selectedIcon, false);
        selectedIcon = (1 + selectedIcon) % ICONS.length;
        toggleHighlighted(selectedIcon, true);
      }
    } else {
      handleUserAction(ICONS[selectedIcon]);
    }
  };

  const tick = () => {
    setClock(clock + 1);
    if (clock === wakeTime) {
      wake();
    } else if (clock === sleepTime) {
      sleep();
    } else if (clock === hungryTime) {
      getHungry();
    } else if (clock === timeToStartCelebrating) {
      startCelebrating();
    } else if (clock === timeToEndCelebrating) {
      endCelebrating();
    } else if (clock === poopTime) {
      poop();
    } else if (clock === dieTime) {
      die();
    }

    return clock;
  };
  const endCelebrating = () => {
    setTimeToEndCelebrating(-1);
    setCurrent('IDLING');
    determineFoxState();
    togglePoopBag(false);
  };

  const wake = () => {
    console.log('wakeee');
    setCurrent('IDLING');
    setWakeTime(-1);
    modFox('idling');
    setscene(Math.random() > RAIN_CHANCE ? 0 : 1);
    modScene(SCENES[scene]);
    determineFoxState();
    setSleepTime(clock + DAY_LENGTH);
    setHungryTime(getNextHungerTime(clock));
  };
  const clearTimes = () => {
    setWakeTime(-1);
    setSleepTime(-1);
    setHungryTime(-1);
    setDieTime(-1);
    setPoopTime(-1);
    setTimeToStartCelebrating(-1);
    setTimeToEndCelebrating(-1);
  };
  const sleep = () => {
    setCurrent('SLEEP');
    modFox('sleep');
    modScene('night');
    clearTimes();
    setWakeTime(clock + NIGHT_LENGTH);
  };
  const getHungry = () => {
    setCurrent('HUNGRY');
    setDieTime(getNextDieTime(clock));
    setHungryTime(-1);
    modFox('hungry');
  };
  const die = () => {
    setCurrent('DEAD');
    modScene('dead');
    modFox('dead');
    clearTimes();
    writeModal('The fox died :( <br/> Press the middle button to start');
  };
  const startGame = () => {
    setCurrent('HATCHING');
    setWakeTime(clock + 3);
    modFox('egg');
    modScene('day');
    writeModal();
  };
  const determineFoxState = () => {
    if (current === 'IDLING') {
      if (SCENES[scene] === 'rain') {
        modFox('rain');
      } else {
        modFox('idling');
      }
    }
  };
  const startCelebrating = () => {
    setCurrent('CELEBRATING');
    modFox('celebrate');
    setTimeToStartCelebrating(-1);
    setTimeToEndCelebrating(clock + 2);
  };
  const changeWeather = () => {
    setscene((1 + scene) % SCENES.length);
    modScene(SCENES[scene]);
    determineFoxState();
  };
  const cleanUpPoop = () => {
    if (current === 'POOPING') {
      setDieTime(-1);
      togglePoopBag(true);
      startCelebrating();
      setHungryTime(getNextHungerTime(clock));
    }
  };
  const poop = () => {
    setCurrent('POOPING');
    setPoopTime(-1);
    setDieTime(getNextDieTime(clock));
    modFox('pooping');
  };
  const feed = () => {
    if (current !== 'HUNGRY') {
      return;
    }

    setCurrent('FEEDING');
    setDieTime(-1);
    setPoopTime(getNextPoopTime(clock));
    modFox('eating');
    setTimeToStartCelebrating(clock + 2);
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
      case 'weather':
        changeWeather();
        break;
      case 'poop':
        cleanUpPoop();
        break;
      case 'fish':
        feed();
        break;
    }
  };

  return (
    <div className='buttons' onClick={e => buttonClick(e)}>
      <button className='btn left-btn'></button>
      <button className='btn middle-btn'></button>
      <button className='btn right-btn'></button>
    </div>
  );
};
export default Buttons;
