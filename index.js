const inputForm = document.getElementById("input");
const resultHolder = document.getElementById("result");

// const inputRegex = /[0-9*\/\+\-\^\\]/;
const inputRegex = /[0-9*\/\+\-\^\√]/;
const numbersRegex = /[0-9]/;
const actionRegex = /[*\/\+\-\^\√]/;

function onInput() {
  let endRes = "";
  [...inputForm.value].map((e, i) => {
    if (i == 0 && actionRegex.test(e)) return;
    endRes += inputRegex.test(e) ? e : "";
  });

  inputForm.value = endRes;
}

function performCalculation(character, x, y) {
  let res = x;

  console.log(character);
  switch (character) {
    case "*":
      res *= y;
      break;
    case "/":
      res /= y;
      break;
    case "+":
      res += y;
      break;
    case "-":
      res -= y;
      break;
    case "^":
      res = Math.pow(res, y);
      break;
    case '√':
      res = Math.pow(y, 1 / res);
      break;
  }
  return res;
}

function calc() {
  let numbers = String(inputForm.value).split(actionRegex).map(e => Number(e));
  let actions = String(inputForm.value).split(numbersRegex).filter(e => e !== "");


  if (actions.filter(e => e.length !== 1).length) return alert("wrong data");

  let sum = numbers[0];

  while (numbers.length > 1) {
    const actionsOrder = "√^/*+-";
    let activeAction = "";
    for (let index = 0; index < actionsOrder.length; index++) {
      if (actions.includes(actionsOrder[index])) {
        activeAction = actionsOrder[index];
        break;
      }
    }

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action === activeAction) {
        numbers[i] = performCalculation(action, numbers[i], numbers[i + 1]);
        numbers = numbers.filter((_, ii) => ii !== i + 1);
        actions = actions.filter((_, ii) => ii !== i);
        break;
      }
    }
  }
  sum = numbers[0];

  resultHolder.textContent = sum;
}