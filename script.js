const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let previousInput = '';
let operator = null;

numberButtons.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.dataset.number))
);

operatorButtons.forEach(button =>
  button.addEventListener('click', () => setOperator(button.dataset.operator))
);

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLast);
equalsButton.addEventListener('click', compute);

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') compute();
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      computation = prev / current;
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }
  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function clear() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}
