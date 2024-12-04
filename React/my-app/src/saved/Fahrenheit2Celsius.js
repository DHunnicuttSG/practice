import React, { useState } from 'react';

function F2C() {
  const [fahrenheit, setFahrenheit] = useState('');
  const [celsius, setCelsius] = useState('');

  const convertToCelsius = (f) => {
    return (f - 32) * 5/9;
  };

  const handleChange = (e) => {
    const f = e.target.value;
    setFahrenheit(f);
    setCelsius(convertToCelsius(f).toFixed(2));
  };

  return (
    <div>
      <h1>Fahrenheit to Celsius</h1>
      <div>
        <label>
          Fahrenheit:
          <input
            type="number"
            value={fahrenheit}
            onChange={handleChange}
            placeholder="Enter Fahrenheit"
          />
        </label>
      </div>

      <p>{fahrenheit}°F is {celsius}&deg;C</p>
    </div>
  );
}

export default F2C;
