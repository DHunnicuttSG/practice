import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const handleNum1Change = (e) => {
    setNum1(Number(e.target.value));
  };

  const handleNum2Change = (e) => {
    setNum2(Number(e.target.value));
  };

  const handleClick = (num1, num2) => {
    <Child num1={num1} num2={num2} />
  }

  return (
    <div>
      <h1>Parent Component</h1>
      <input type="number" value={num1} onChange={handleNum1Change} placeholder="Enter first number" />
      <input type="number" value={num2} onChange={handleNum2Change} placeholder="Enter second number" />

      <p>The Sum of two Nos {num1} & {num2} is : {num1 + num2}</p>
      <button type='button' onClick={() => handleClick()}>Send to Child</button>
      <Child num1={num1} num2={num2} />
    </div>


  );
};

export default Parent;
