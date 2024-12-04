import React from "react";

function Greetings({greeting='Hi', name}) {
    return (
        <div>
            <h2>{greeting}, { name}!</h2>
        </div>
    )
}

export default Greetings