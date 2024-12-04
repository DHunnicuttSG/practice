import React, {useState} from 'react'

function C2F() {
    const [fahrenheit, setFahrenheit] = useState('');
    const [celsius, setCelsius] = useState('');
  
    const convertToFahrenheit = (c) => {
      return (c * 9/5) + 32;
    };

    const handleChange = (e) => {
      const c = e.target.value;
      setCelsius(c);
      setFahrenheit(convertToFahrenheit(c).toFixed(2));
    };


  return (
<>
  <div>
  <h1>Celsius to Fahrenheit</h1>
    <label>
      Celsius:
      <input
        type="number"
        value={celsius}
        onChange={handleChange}
        placeholder="Enter Celsius"
      />
    </label>
  </div>
  <p>{celsius}&deg;C is {fahrenheit}°F</p>
</>
  )
}

export default C2F;