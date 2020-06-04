import React from 'react';
import './styles.css';

import Icons from './components/Icons';
import Buttons from './components/Buttons';
function App() {
  return (
    <div className='container'>
      <div className='inner'>
        <div className='game day'></div>
        <div className='fox hidden'></div>
        <div className='poop-bag hidden'></div>
        <div className='foreground-rain'></div>
        <div className='frame'></div>
        <div className='modal'>
          <div className='modal-inner'>Press the middle button to start</div>
        </div>
        <Buttons />
        <Icons />
      </div>
    </div>
  );
}

export default App;
