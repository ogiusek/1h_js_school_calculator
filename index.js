const inputForm = document.getElementById("input");
const resultHolder = document.getElementById("result");

const inputRegex = /[0-9*\/\+\-\^]/;
const numbersRegex = /[0-9]/;
const actionRegex = /[*\/\+\-\^]/;

function onInput() {
  let endRes = "";
  [...inputForm.value].map((e, i) => {
    if (i == 0 && actionRegex.test(e)) return;
    endRes += inputRegex.test(e) ? e : "";
  });

  inputForm.value = endRes;
}


function calc() {
  const numbers = String(inputForm.value).split(actionRegex).map(e => Number(e));
  const actions = String(inputForm.value).split(numbersRegex).filter(e => e !== "");


  if (actions.filter(e => e.length !== 1).length) return alert("wrong data");

  let sum = numbers[0];
  numbers.shift();

  actions.map((e, i) => {
    switch (e) {
      case "*":
        sum *= numbers[i];
        break;
      case "/":
        sum /= numbers[i];
        break;
      case "+":
        sum += numbers[i];
        break;
      case "-":
        sum -= numbers[i];
        break;
      case "^":
        sum = Math.pow(sum, numbers[i]);
        break;
    }
  });

  resultHolder.textContent = sum;
}