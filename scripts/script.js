let firstValue = 0;
let secondValue = 0;
let result = null;
let beforeMathOperation = null;
let counterPressed = 0
let lastValue = 0;
let inputText = document.querySelector('input[type="text"]');
const inputButtons = document.querySelectorAll('input[type="button"]');
const mathOperation = document.querySelectorAll('.math-operation');
const equalMathOperation = document.querySelector('.equal-math-operation');
const btnClear = document.querySelector('.btn-clear');
const btnNumbers = document.querySelectorAll('.btn-numbers');

/**
 * Limpa inputs e variáveis
 */
const cleanAll = () => {
  inputText.value = '';
  firstValue = 0;
  secondValue = 0;
  result = null;
  beforeMathOperation = null;
}

/**
 * Quando a tecla é pressionada a função verifica se a tecla pressionada faz parte
 * da calculadores e então insere o valor/operação no input
 */
const handleClick = event => {
  const acceptableValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '='];
  for (let i = 0; i < acceptableValues.length; i++) {
    if (event.key === acceptableValues[i]) {
      console.log("OK")
      document.querySelector(`input[value="${event.key}"]`).click();
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
      if (!counterPressed) {
        if (!firstValue && !beforeMathOperation) {
          firstValue = Number(inputText.value);
          beforeMathOperation = event.target.value;
          inputText.value += beforeMathOperation;
          
        } else if (firstValue && beforeMathOperation) {
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
          secondValue = Number(inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1));
          
          if (beforeMathOperation === '+') result = firstValue + secondValue;
          else if (beforeMathOperation === '-') result = firstValue - secondValue;
          else if (beforeMathOperation === '*') result = firstValue * secondValue;
          else if (beforeMathOperation === '/') result = firstValue / secondValue;
          
          beforeMathOperation = event.target.value;
          
          inputText.value = `${result}`;
          inputText.value += event.target.value;
          firstValue = result;
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
  secondValue = Number(inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1));

  if (firstValue && secondValue && beforeMathOperation) {
    if (beforeMathOperation === '+') result = firstValue + secondValue;
    else if (beforeMathOperation === '-') result = firstValue - secondValue;
    else if (beforeMathOperation === '*') result = firstValue * secondValue;
    else if (beforeMathOperation === '/') result = firstValue / secondValue;

    inputText.value = result;
    firstValue = result;
    secondValue = 0;
    beforeMathOperation = null;
  }
}

/**
 * Recebe o clique do primeiro e segundo valor da conta
 * Após o primeiro ser recebido só será recebindo o segundo valor porque o primeiro valor será ocupado pelo resultado
 */
const setValuesToInput = (btnNumbers) => {
  if (beforeMathOperation === null) {
    inputText.value += btnNumbers.value;
  } else {
    inputText.value += btnNumbers.value;
  }
}

/**
 * Impede com que o pressionamento da tecla insira o valor no input
 */
 const disableKeyPress = event => {
  event.preventDefault();
  return false;
}

btnClear.addEventListener('click', cleanAll);

equalMathOperation.addEventListener('click', getResult);

document.addEventListener('keypress', handleClick);

inputText.addEventListener('keypress', disableKeyPress);

btnNumbers.forEach((value, key) => {
  btnNumbers[key].addEventListener('click', function() {setValuesToInput(btnNumbers[key])});
});

mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', calculate);
});


// document.addEventListener('keypress', calculate);