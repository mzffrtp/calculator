// VARIABLES

const display = document.querySelector(".calInput");
const keys = document.querySelector(".calculatorKeys");

let displayValue = "0";

let firstValue = null;
let operator = null;
let waitingForTheNext = false;


// ------------------ //

updateDisplay();

keys.addEventListener("click", function (e) {
    const element = e.target;

    if (element.classList.contains("operator")) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("decimal")) {
        inputDecimal();
        updateDisplay();
        return;
    }

    if (element.classList.contains("clearSign")) {
        clear();
        updateDisplay();
        return;
    }
    inputPrevious(element.value);
    updateDisplay();
   
})

// FUNCTIONS

function updateDisplay() {
    display.value = displayValue;
}

function inputPrevious(num) {

    if (waitingForTheNext){
        displayValue = num;
        waitingForTheNext = false;
    } else {
        displayValue = displayValue === "0"? num: displayValue + num;
    }
}

function inputDecimal() {

    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}

function clear () {
    displayValue = "0";
}

function handleOperator(nextOperator) {

    const value = parseFloat(displayValue);
    
    if (operator && waitingForTheNext) {
        operator = operator;
        return;
    }

    if (firstValue === null){
        firstValue = value;

    } else if (operator) {
        const result = calculate (firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForTheNext = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForTheNext);
}



function calculate (first, second, operator) {
    
    if (operator === "+") {
        return first + second;
    } else if (operator === "-"){
        return first - second;
    } else if (operator === "*"){
        return first * second;
    } else if (operator === "/"){
        return first / second;
    }
    return second;
}