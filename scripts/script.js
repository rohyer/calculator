let firstValue = 0, firstFinalValue = 0;
let secondValue = 0, secondFinalValue = 0;
let result = null;
let beforeMathOperation = null;
let inputText = document.querySelector('input[type="text"]');

/**
 * Limpa as variáveis e atribui vazio para o input text
 */
const btnClear = document.querySelector('.btn-clear');
btnClear.addEventListener('click', function() {
  inputText.value = '';
  firstValue = 0;
  firstFinalValue = 0;
  secondValue = 0;
  secondFinalValue = 0;
  result = null;
  beforeMathOperation = null;
});

/**
 * Recebe o clique do primeiro e segundo valor da conta
 * Após o primeiro ser recebido só será recebindo o segundo valor porque o primeiro valor será ocupado pelo resultado
 */
const btnNumbers = document.querySelectorAll('.btn-numbers');
btnNumbers.forEach((value, key) => {
  btnNumbers[key].addEventListener('click', function() {
    if (beforeMathOperation === null) {
      firstValue += btnNumbers[key].value;
      inputText.value += btnNumbers[key].value;
    } else {
      secondValue += btnNumbers[key].value;
      inputText.value += btnNumbers[key].value;
    }
  });
});

/**
 * Recebe a operação matemática
 * O resultado só será apresentado após o recebimento da segunda operação
 */
const mathOperation = document.querySelectorAll('.math-operation');
mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', function() {
    if (!secondValue) {
      if (firstValue) firstFinalValue = Number(firstValue);
      beforeMathOperation = value.value;
      inputText.value += ` ${beforeMathOperation} `;
    } else {
      if (secondValue) secondFinalValue = Number(secondValue);

      if (beforeMathOperation === '+') result = firstFinalValue + secondFinalValue;
      else if (beforeMathOperation === '-') result = firstFinalValue - secondFinalValue;
      else if (beforeMathOperation === 'X') result = firstFinalValue * secondFinalValue;
      else if (beforeMathOperation === '/') result = firstFinalValue / secondFinalValue;

      beforeMathOperation = value.value;
      inputText.value = `${result} ${beforeMathOperation} `;

      console.log(`Primeiro valor: ${firstFinalValue}`);
      console.log(`Segundo valor: ${secondFinalValue}`);
      console.log(`Resultado: ${result}`)

      secondValue = 0;
      firstFinalValue = result;
    }
  });
});