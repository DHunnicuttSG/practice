import React, { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const Calculator = () => {
  const [value, setValue] = useState('');

  const handleClick = (button) => {
    if (button === '=') {
      try {
        const result = new Function('return ' + value)();
        setValue(result.toString());
      } catch (e) {
        setValue('Error');
      }
    } else if (button === 'AC') {
      setValue('');
    } else {
      setValue(value + button);
    }
  };

  return (
    <div className="calculator">
      <Display value={value} />
      <Keypad onClick={handleClick} />
    </div>
  );
};

export default Calculator;
