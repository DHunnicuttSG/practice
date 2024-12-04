import React from "react";

function Keypad({ onClick }) {
    
    const handleClick = (value) => {
        console.log('button click:' + value)
        return onClick(value)
        
    }

    return (
        <div className="keypad">
            {/* first row */}
            <button onClick={() => handleClick(1)}>1</button>
            <button onClick={() => handleClick(2)}>2</button>
            <button onClick={() => handleClick(3)}>3</button>
            <button onClick={() => handleClick('+')}>+</button>

            {/* second row */}
            <button onClick={() => handleClick(4)}>4</button>
            <button onClick={() => handleClick(5)}>5</button>
            <button onClick={() => handleClick(6)}>6</button>
            <button onClick={() => handleClick('-')}>-</button>

            {/* third row */}
            <button onClick={() => handleClick(7)}>7</button>
            <button onClick={() => handleClick(8)}>8</button>
            <button onClick={() => handleClick(9)}>9</button>
            <button onClick={() => handleClick('*')}>*</button>

            {/* fourth row */}
            <button onClick={() => handleClick(0)}>0</button>
            <button onClick={() => handleClick('/')}>/</button>
            <button onClick={() => handleClick('AC')}>AC</button>
            <button onClick={() => handleClick('=')}>=</button>
        </div>
    )
}


export default Keypad