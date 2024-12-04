import React, { useState } from 'react'

function C2F() {
    const [fahrenheit, setFahrenheit] = useState('')
    const [celsius, setCelsius] = useState('')

    const convertToCelsius = (c) => {
        return (c * 9/5) + 32;
    }

    const handleChange = (e) => {
        const c = e.target.value
        setCelsius(c)
        setFahrenheit(convertToCelsius(c).toFixed(2))
    }

    return (
        <div>
            <h2>Celsius to Fahrenheit</h2>
            <label>Celsius: </label>
            <input
                type='number'
                value={celsius}
                onChange={handleChange}
                placeholder='Enter Celsius' />
                <p>{celsius}&deg;C is {fahrenheit}&deg;F </p>
        </div>
    )
}

export default C2F
