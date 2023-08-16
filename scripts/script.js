let firstValue = 0;
let secondValue = 0;
let result = null;
let beforeMathOperation = null;
let counterPressed = 0
let lastValue = 0;
let isFirstFieldFilled = 0;
let isSecondFieldFilled = 0;
let commaCounter = 0;
let inputText = document.querySelector('input[type="text"]');
const inputButtons = document.querySelectorAll('input[type="button"]');
const mathOperation = document.querySelectorAll('.math-operation');
const equalMathOperation = document.querySelector('.equal-math-operation');
const subtractionMathOperation = document.getElementById('subtraction-math-operation');
const btnClear = document.querySelector('.btn-clear');
const btnCancelEntry = document.querySelector('.btn-cancel-entry');
const btnNumbers = document.querySelectorAll('.btn-numbers');
const btnDot = document.querySelector('.btn-dot');
const darkThemeBtn = document.getElementById('dark-theme');
const lightThemeBtn = document.getElementById('light-theme');

/**
 * Limpa inputs e variáveis
 */
const cleanAll = () => {
  inputText.value = '';
  firstValue = 0;
  secondValue = 0;
  result = null;
  beforeMathOperation = null;
  counterPressed = 0;
}

/**
 * The pressed key is checked if it is part of the calculator and then inserts the value or
 * operation in the input
 */
const handleClick = event => {
  const acceptableValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '+', '-', '*', '/', '=', 'Backspace', 'Escape'];
  for (let i = 0; i < acceptableValues.length; i++) {
    if (event.key === acceptableValues[i]) {
      document.querySelector(`input[data-name="${event.key}"]`).click();
    }
  }
}

/**
 * This function does the math using the variables with their respctive values
 */
const calculate = (event) => {
  lastValue = inputText.value[inputText.value.length - 1];

  if (event.target.value === '+' || 
    event.target.value === '-' || 
    event.target.value === '*' || 
    event.target.value === '/') {

    if (inputText.value === '') {
      return false;
      
    } else {
      commaCounter = 0;

      if (!counterPressed) {
        firstValue = inputText.value;
        if (!firstValue && !beforeMathOperation) {
          console.log('1');
          beforeMathOperation = event.target.value;
          inputText.value += beforeMathOperation;
          
        } else if (firstValue && beforeMathOperation) {
          console.log('2');
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
          
        } else if (firstValue && !beforeMathOperation) {
          console.log('3');
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
        }

        counterPressed++;
      } else {
        if (lastValue === '+' || lastValue === '-' || lastValue === '*' || lastValue === '/') {
          lastValue = inputText.value[inputText.value.length - 1]
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
        } else {
          secondValue = inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1);

          const isFirstValueADecimal = firstValue.includes(",");
          isFirstValueADecimal ? firstValue = firstValue.replace(",", ".")
                            : firstValue = firstValue;

          const isSecondValueADecimal = secondValue.includes(",")
          isSecondValueADecimal ? secondValue = secondValue.replace(",", ".")
                                : secondValue = secondValue;
          
          firstValue = Number(firstValue);
          secondValue = Number(secondValue);

          if (beforeMathOperation === '+') result = (firstValue + secondValue).toPrecision();
          else if (beforeMathOperation === '-') result = (firstValue - secondValue).toPrecision();
          else if (beforeMathOperation === '*') result = (firstValue * secondValue).toPrecision();
          else if (beforeMathOperation === '/') result = (firstValue / secondValue).toPrecision();
          
          beforeMathOperation = event.target.value;

          firstValue = result;

          const hasADotOnResult = result;
          hasADotOnResult ? result = result.replace(".", ",")
                          : result = result;
          
          inputText.value = result;
          inputText.value += event.target.value;
          secondValue = 0;
        }
      }
    }
  }
}

/**
 * Function does the math using firstValue, secondValue and beforeMathOperation variables
 */
const getResult = () => {
  secondValue = inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1);
  const isSecondValueADecimal = secondValue.includes(",")
          isSecondValueADecimal ? secondValue = secondValue.replace(",", ".")
                                : secondValue = secondValue;
                      
  if (firstValue && secondValue && beforeMathOperation) {
    firstValue = Number(firstValue);
    secondValue = Number(secondValue);
    
    if (beforeMathOperation === '+') result = firstValue + secondValue;
    else if (beforeMathOperation === '-') result = firstValue - secondValue;
    else if (beforeMathOperation === '*') result = firstValue * secondValue;
    else if (beforeMathOperation === '/') result = firstValue / secondValue;

    inputText.value = result;
    firstValue = result;
    secondValue = 0;
    beforeMathOperation = null;
    counterPressed = 0;
  }
}

/**
 * Gets the click of the first and second value of the calculation
 * After the first one is received, only the second value will be received because 
 * the first value will be occupied by the result
 */
const setValuesToInput = (btnNumbers) => {
  if (beforeMathOperation === null) {
    inputText.value += btnNumbers.value;
    isFirstFieldFilled = 1;
  } else {
    inputText.value += btnNumbers.value;
    isSecondFieldFilled = 1;
  }
}

/**
 * Impede com que o pressionamento da tecla insira o valor no input
 */
const disableKeyDown = event => {
  event.preventDefault();
  return false;
}

const cancelEntry = event => {
  if (beforeMathOperation === null) {
    inputText.value = '';
    firstValue = 0;
  } else {
    secondValue = 0;
    inputText.value = firstValue + beforeMathOperation;
  }
}

const setDot = () => {
  if ((!firstValue && isFirstFieldFilled && !commaCounter) ||
      (firstValue && isSecondFieldFilled && !commaCounter)) {
        inputText.value += ',';
        commaCounter++; 
  }
}

const setNegativeNumber = event => {
  if (inputText.value === '') inputText.value = ' ';
}

const changeTheme = () => {
  const body = document.querySelector('body');

  if (darkThemeBtn.className.includes('active')) {
    darkThemeBtn.classList.remove('active');
    lightThemeBtn.classList.add('active');

    if (!body.className.includes('dark-theme')) {
      body.classList.add('dark-theme');
    }
  } else if (lightThemeBtn.className.includes('active')) {
    lightThemeBtn.classList.remove('active');
    darkThemeBtn.classList.add('active');

    if (body.className.includes('dark-theme')) {
      body.classList.remove('dark-theme');
    }
  }
}

inputText.addEventListener('keydown', disableKeyDown);

btnClear.addEventListener('click', cleanAll);

equalMathOperation.addEventListener('click', getResult);

document.addEventListener('keydown', handleClick);

subtractionMathOperation.addEventListener('click', setNegativeNumber);

btnCancelEntry.addEventListener('click', cancelEntry)

btnDot.addEventListener('click', setDot);

btnNumbers.forEach((value, key) => {
  btnNumbers[key].addEventListener('click', function() {setValuesToInput(btnNumbers[key])});
});

mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', calculate);
});

darkThemeBtn.addEventListener('click', changeTheme);
lightThemeBtn.addEventListener('click', changeTheme);

// document.addEventListener('keypress', calculate);