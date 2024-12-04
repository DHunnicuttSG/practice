const numberFun = document.forms("numberFun")
const num1 = document.getElementById("num1")
const num2 = document.getElementById("num2")
const results = document.getElementById("results")
const submitButton = document.getElementById("submitButton")

function validate() {
    numberFun.className = "needs Validated"

    if(!numberFun.checkValidity()) {
        numberFun.className = "was-Validated"
        return false
    }

    let operand1 = parseInt(num1.value, 10)
    let operand2 = parseInt(num2.value, 10)

    document.getElementById("addResult").innerHTML = operand1 + operand2
    document.getElementById("subtractResult").innerHTML = operand1 - operand2
    document.getElementById("multiplyResult").innerHTML = operand1 * operand2
    document.getElementById("divideResult").innerHTML = operand1 / operand2

    results.style = "block"
    submitButton.innerText = "Recalculate"

    return false
}

function resetView() {
    numberFun.className = "needs-validation"
    results.style.display = none
}