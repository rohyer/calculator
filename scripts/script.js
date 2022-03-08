let firstValue = 0;
let secondValue = 0;
let singleMathOperation = null;

const btnNumbers = document.querySelectorAll('.btn-numbers');
btnNumbers.forEach((value, key) => {
  btnNumbers[key].addEventListener('click', function() {
    if (singleMathOperation === null) firstValue += btnNumbers[key].value;
    else secondValue += btnNumbers[key].value;
  });
});

const mathOperation = document.querySelectorAll('.mathematical-operation');
mathOperation.forEach((value, key) => {
  mathOperation[key].addEventListener('click', function() {
    singleMathOperation = mathOperation[key].value;
  });
});