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
const btnClear = document.querySelector('.btn-clear');
const btnCancelEntry = document.querySelector('.btn-cancel-entry');
const btnNumbers = document.querySelectorAll('.btn-numbers');
const btnDot = document.querySelector('.btn-dot');

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
 * Quando a tecla é pressionada a função verifica se a tecla pressionada faz parte
 * da calculadores e então insere o valor/operação no input
 */
const handleClick = event => {
  console.log(event.key);
  const acceptableValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '+', '-', '*', '/', '=', 'Backspace'];
  for (let i = 0; i < acceptableValues.length; i++) {
    if (event.key === acceptableValues[i]) {
      console.log("OK")
      document.querySelector(`input[data-name="${event.key}"]`).click();
    }
  }
}

/**
 * Faz o calculo de acordo com o que as variáveis recebem de valor
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
          // firstValue = Number(firstValue);
          beforeMathOperation = event.target.value;
          inputText.value += beforeMathOperation;
          
        } else if (firstValue && beforeMathOperation) {
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
          
        } else if (firstValue && !beforeMathOperation) {
          // firstValue = Number(firstValue);
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
 * Faz a conta usando os valores das variaveis firstValue, SecondValue e beforeMathOperation
 */
const getResult = () => {
  secondValue = inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1);
  const isSecondValueADecimal = secondValue.includes(",")
          isSecondValueADecimal ? secondValue = secondValue.replace(",", ".")
                                : secondValue = secondValue;
                      
  firstValue = Number(firstValue);
  secondValue = Number(secondValue);

  if (firstValue && secondValue && beforeMathOperation) {
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
 * Recebe o clique do primeiro e segundo valor da conta
 * Após o primeiro ser recebido só será recebindo o segundo valor porque o primeiro valor será ocupado pelo resultado
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

  console.log(firstValue);
  console.log(secondValue);
  console.log(beforeMathOperation);
}

const setDot = () => {
  if ((!firstValue && isFirstFieldFilled && !commaCounter) ||
      (firstValue && isSecondFieldFilled && !commaCounter)) {
        inputText.value += ',';
        commaCounter++; 
  }
}

inputText.addEventListener('keydown', disableKeyDown);

btnClear.addEventListener('click', cleanAll);

equalMathOperation.addEventListener('click', getResult);

document.addEventListener('keydown', handleClick);

btnCancelEntry.addEventListener('click', cancelEntry)

btnDot.addEventListener('click', setDot);

btnNumbers.forEach((value, key) => {
  btnNumbers[key].addEventListener('click', function() {setValuesToInput(btnNumbers[key])});
});

mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', calculate);
});

// document.addEventListener('keypress', calculate);