let firstValue = 0, firstFinalValue = 0;
let secondValue = 0, secondFinalValue = 0;
let result = null;
let beforeMathOperation = null;
let inputText = document.querySelector('input[type="text"]');
const inputButtons = document.querySelectorAll('input[type="button"]');
let counterPressed = 0
const mathOperation = document.querySelectorAll('.math-operation');
let lastValue = 0;

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
      inputText.value += btnNumbers[key].value;
    } else {
      inputText.value += btnNumbers[key].value;
    }
  });
});


const handleClick = event => {
  const acceptableValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '='];
  for (let i = 0; i < acceptableValues.length; i++) {
    if (event.key === acceptableValues[i]) {
      console.log("OK")
      document.querySelector(`input[value="${event.key}"]`).click();
    }
  }
}

document.addEventListener('keypress', handleClick);


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
          console.log(1);
          firstValue = Number(inputText.value);
          beforeMathOperation = event.target.value;
          inputText.value += beforeMathOperation;
          
        } else if (firstValue && beforeMathOperation) {
          console.log(2);
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
        }

        counterPressed++;
        // console.log(lastValue);
      } else {
        if (lastValue === '+' || lastValue === '-' || lastValue === '*' || lastValue === '/') {
          console.log(3);
          lastValue = inputText.value[inputText.value.length - 1]
          beforeMathOperation = event.target.value;
          inputText.value = firstValue + beforeMathOperation;
          console.log("aquiiiiii" + lastValue);
        } else {
          console.log(4);
          secondValue = Number(inputText.value.slice(inputText.value.lastIndexOf(beforeMathOperation) + 1));
          console.log(typeof firstValue + ' ' + firstValue);
          console.log(typeof secondValue + ' ' + secondValue);
          
          if (beforeMathOperation === '+') result = firstValue + secondValue;
          else if (beforeMathOperation === '-') result = firstValue - secondValue;
          else if (beforeMathOperation === '*') result = firstValue * secondValue;
          else if (beforeMathOperation === '/') result = firstValue / secondValue;
          
          beforeMathOperation = event.target.value;
          
          inputText.value = `${result}`;
          inputText.value += event.target.value;
          firstValue = result;
          secondValue = 0;
          // counterPressed = 0;
        }
      }

    }
    

    // if (!counterPressed) {
    //   firstValue = Number(inputText.value);

    //   if (firstValue && !beforeMathOperation) {
    //     console.log('IF');
    //     beforeMathOperation = event.key || event.target.value;
        
    //     inputText.value += beforeMathOperation;

    //     console.log('Tamanho: ' + inputText.value[inputText.value.length - 1]);
    //   }
    // } else {
    //   if (firstValue && beforeMathOperation) {
    //     console.log('ELSE');
    //     beforeMathOperation = event.key ? event.key : event.target.value;
        
    //     inputText.value[inputText.value.length - 1] = 10;
    //     console.log(inputText.value);
    //   } else {
    //     secondValue = Number(inputText.value.slice(inputText.value.indexOf(beforeMathOperation)));
        
    //     if (beforeMathOperation === '+') result = firstValue + secondValue;
    //     else if (beforeMathOperation === '-') result = firstValue - secondValue;
    //     else if (beforeMathOperation === '*') result = firstValue * secondValue;
    //     else if (beforeMathOperation === '/') result = firstValue / secondValue;
        
    //     beforeMathOperation = event.key ? event.key : event.target.value;
        
    //     inputText.value = `${result}`;
    //     if (!event.key) inputText.value += event.target.value;
    //     firstValue = result;
    //     secondValue = 0;
    //     counterPressed = 0;
    //   }
    // }
    // counterPressed++;
  }
}

document.addEventListener('keypress', calculate);

mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', calculate);
});

inputText.addEventListener('keypress', function(event) {
  event.preventDefault();
  return false;
})



/**
 * Recebe a operação matemática
 * O resultado só será apresentado após o recebimento da segunda operação
 */
// const mathOperation = document.querySelectorAll('.math-operation');
// mathOperation.forEach((value, key) => {
//   mathOperation[key].addEventListener('click', function() {
//     if (!secondValue) {
//       console.log('IF');
//       if (firstValue && !beforeMathOperation) {
//         firstFinalValue = Number(firstValue);
//         beforeMathOperation = value.value;
//         inputText.value += ` ${beforeMathOperation} `;

//       } else if (firstValue && beforeMathOperation) {
//         beforeMathOperation = value.value;
//         inputText.value = inputText.value.slice(0, inputText.value.indexOf(' '));
//         inputText.value += ` ${beforeMathOperation} `;

//       }
//     } else {
//       console.log('ELSE');
//       if (secondValue) {
//         secondFinalValue = Number(secondValue);

//         if (beforeMathOperation === '+') result = firstFinalValue + secondFinalValue;
//         else if (beforeMathOperation === '-') result = firstFinalValue - secondFinalValue;
//         else if (beforeMathOperation === 'X') result = firstFinalValue * secondFinalValue;
//         else if (beforeMathOperation === '/') result = firstFinalValue / secondFinalValue;

//         beforeMathOperation = value.value;
//         inputText.value = `${result} ${beforeMathOperation} `;

//         secondValue = 0;
//         firstFinalValue = result;
//       }
//     }
//   });
// });


const equalMathOperation = document.querySelector('.equal-math-operation');
equalMathOperation.addEventListener('click', function() {
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
});