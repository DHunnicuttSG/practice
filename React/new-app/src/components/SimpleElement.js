import React from "react";


function SimpleElements() {
    const element = <h1>Hello World</h1>  //This is JSX

    // const element2 = React.createElement("h1", null,  element)
    // Do display this you will need to use root.render(element2)
    // Use the index.js file 

    return (
        <>
        {element}
        </>
    )
}

export default SimpleElements
