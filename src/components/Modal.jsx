import React, { useState, useEffect } from 'react';

const Modal = ({ current, scene }) => {
  const [modalState, setModalState] = useState('');

  useEffect(() => {
    switch (current) {
      case 'DEAD':
        setModalState('The fox died :( Press the middle button to start');
        break;
      case 'INIT':
        setModalState('Press the middle button to start');
        break;
      default:
        setModalState('');
        break;
    }
  }, [current]);
  return (
    <div className='modal'>
      <div className='modal-inner'> {modalState} </div>
    </div>
  );
};

export default Modal;
