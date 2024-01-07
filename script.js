function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Invalid operator";
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resultDisplayed = false;

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', (e) => {
        if (resultDisplayed) {
            firstNumber = '';
            resultDisplayed = false;
        }
        if (currentOperator === '') {
            firstNumber += e.target.textContent;
            updateDisplay(firstNumber);
        } else {
            secondNumber += e.target.textContent;
            updateDisplay(secondNumber);
        }
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', (e) => {
        if (currentOperator && secondNumber) {
            firstNumber = operate(currentOperator, Number(firstNumber), Number(secondNumber)).toString();
            secondNumber = '';
        }
        currentOperator = e.target.textContent;
        updateDisplay(currentOperator);
    });
});

document.getElementById('equals').addEventListener('click', () => {
    if (firstNumber && secondNumber && currentOperator) {
        firstNumber = operate(currentOperator, Number(firstNumber), Number(secondNumber)).toString();
        updateDisplay(firstNumber);
        secondNumber = '';
        currentOperator = '';
        resultDisplayed = true;
    }
});

document.getElementById('clear').addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    updateDisplay('0');
});

function updateDisplay(value) {
    document.getElementById('display').textContent = value;
}

document.querySelector('.digit').addEventListener('click', (e) => {
    if (e.target.textContent === '.' && (currentOperator && secondNumber.includes('.') || !currentOperator && firstNumber.includes('.'))) {
        return;
    }
});

document.getElementById('backspace').addEventListener('click', () => {
    if (currentOperator) {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(secondNumber);
    } else {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber);
    }
});

document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        document.querySelector(`button.digit:contains('${e.key}')`).click();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        document.querySelector(`button.operator:contains('${e.key}')`).click();
    } else if (e.key === 'Enter' || e.key === '=') {
        document.getElementById('equals').click();
    } else if (e.key === 'Backspace') {
        document.getElementById('backspace').click();
    } else if (e.key === 'Escape') {
        document.getElementById('clear').click();
    }
    e.preventDefault(); 
});
