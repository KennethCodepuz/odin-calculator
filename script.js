const btnContainer = document.getElementById('btn-container');
const displayField = document.getElementById('display');

const btnElements = ['C', '%', 'CE', '/', 
                     '9', '8', '7', '*', 
                     '6', '5', '4', '+', 
                     '3', '2', '1', '-', 
                     '0', '.', '='];

// Create calculator buttons
btnElements.forEach(item => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = item;
    if (item === '=') {
        btn.classList.add('equal-button');
    }
    btnContainer.appendChild(btn);
});

// Calculator state variables
const btns = document.querySelectorAll('.btn');
let currentInput = '';
let storedNumber = null;
let currentOperation = null;
let resetDisplayOnNextInput = false;
const numbersAndDecimal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

// Event listeners for buttons
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnValue = btn.innerText;
        
        // Handle clear buttons
        if (btnValue === 'C' || btnValue === 'CE') {
            clearCalculator();
            return;
        }
        
        // Handle number and decimal inputs
        if (numbersAndDecimal.includes(btnValue)) {
            handleNumberInput(btnValue);
            return;
        }
        
        // Handle operation buttons
        if (['+', '-', '*', '/', '%'].includes(btnValue)) {
            handleOperation(btnValue);
            return;
        }
        
        // Handle equals button
        if (btnValue === '=') {
            calculateResult();
            return;
        }
    });
});

// Function to handle number inputs
function handleNumberInput(value) {
    // Reset display if needed
    if (resetDisplayOnNextInput) {
        displayField.innerText = '';
        currentInput = '';
        resetDisplayOnNextInput = false;
    }
    
    // Prevent multiple decimal points
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Update current input and display
    currentInput += value;
    displayField.innerText += value;
}

// Function to handle operations
function handleOperation(op) {
    // If there's current input, process it
    if (currentInput !== '') {
        const inputNumber = parseFloat(currentInput);
        
        // If we already have a stored number and operation, calculate intermediate result
        if (storedNumber !== null && currentOperation !== null) {
            const result = calculate(currentOperation, storedNumber, inputNumber);
            displayField.innerText = result;
            storedNumber = result;
        } else {
            // Otherwise just store the current number
            storedNumber = inputNumber;
        }
        
        currentInput = '';
    } else if (storedNumber === null) {
        // If no input and no stored number, assume 0
        storedNumber = 0;
    }
    
    // Update the operation and prepare for next input
    currentOperation = op;
    resetDisplayOnNextInput = true;
}

// Function to calculate result when equals is pressed
function calculateResult() {
    // If no current input or no operation, nothing to do
    if (currentInput === '' || currentOperation === null) {
        return;
    }
    
    const inputNumber = parseFloat(currentInput);
    const result = calculate(currentOperation, storedNumber, inputNumber);
    
    // Update display and reset for next calculation
    displayField.innerText = result;
    storedNumber = result;
    currentInput = '';
    currentOperation = null;
    resetDisplayOnNextInput = true;
}

// Function to perform the actual calculation
function calculate(operation, num1, num2) {
    switch (operation) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 === 0 ? 'Error' : num1 / num2;
        case '%': return num1 % num2;
        default: return num2;
    }
}

// Function to clear the calculator
function clearCalculator() {
    displayField.innerText = '';
    currentInput = '';
    storedNumber = null;
    currentOperation = null;
    resetDisplayOnNextInput = false;
}