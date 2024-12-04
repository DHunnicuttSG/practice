import React from "react"

// This is an example of using props
function Greeting({greeting, name, number}){
    return (
    <div>
    <h2>{greeting}, {name}!</h2>
    <h2>Hello World of React! </h2>
    <h2>React is {number} times better than JS. </h2>
    </div>
)
}

export default Greeting