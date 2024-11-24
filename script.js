const operatorsRegex = /[\+\−\×\÷]/;
const digitsRegex = /[0-9]+/;
const operationRegex = /([0-9]+[\+\−\×\÷][0-9]+)/;

const percentage = (number) => {
  return round(Number(number) * 0.01);
};

const add = (n1, n2) => {
  return Number(n1) + Number(n2);
};

const subtract = (n1, n2) => {
  return Number(n1) - Number(n2);
};

const multiply = (n1, n2) => {
  return Number(n1) * Number(n2);
};

const divide = (n1, n2) => {
  return Number(n1) / Number(n2);
};

const operate = (operator, n1, n2) => {
  switch (operator) {
    case "+":
      return round(add(n1, n2));
    case "−":
      return round(subtract(n1, n2));
    case "×":
      return round(multiply(n1, n2));
    case "÷":
      return round(divide(n1, n2));
  }
};

const round = (number) => {
  return Math.round(number * 100) / 100;
};

let containerCalculator = document.querySelector(".operations");
let backspace = document.querySelector(".backspace");
let input = document.querySelector(".text");
let operation = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";

const cleanVars = () => {
  operation = "";
  operatorIndex = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  result = "";
};

const cleanInput = () => {
  input.textContent = "";
};

const cleanResult = () => {
  result = "";
};

const giveResult = () => {
  input.textContent = operate(
    operator.textContent,
    firstOperand,
    secondOperand
  );
  cleanVars();
  result = input.textContent;
};

const changeSign = (number) => {
  return number > 0 ? "-" + number : number.replace("-", "");
};

const hasDecimal = (number) => {
  return /\./.test(number);
};

const formDecimals = () => {
  if (result) {
    cleanResult();
  }
  if (secondOperand) {
    if (!hasDecimal(secondOperand)) {
      input.textContent = secondOperand + ".";
      secondOperand = input.textContent;
    } else {
      alert("You already have a decimal number!");
    }
  } else if (firstOperand && !operator) {
    if (!hasDecimal(firstOperand)) {
      input.textContent = firstOperand + ".";
      firstOperand = input.textContent;
    } else {
      alert("You already have a decimal number!");
    }
  } else if (firstOperand && operator) {
    input.textContent = "0.";
    secondOperand = "0.";
  } else {
    input.textContent = "0.";
    firstOperand = "0.";
  }
};

const showInDisplay = (e) => {
  let currentValue = e.target.textContent;

  if (operator) operator.style.opacity = 1;

  if (currentValue === "C") {
    cleanInput();
    cleanVars();
    cleanResult();
  } else if (currentValue === "%") {
    if (secondOperand) {
      input.textContent = percentage(input.textContent);
      secondOperand = input.textContent;
    } else {
      input.textContent = percentage(input.textContent);
      firstOperand = input.textContent;
    }
  } else if (currentValue === "+/-") {
    if (secondOperand) {
      input.textContent = changeSign(input.textContent);
      secondOperand = input.textContent;
    } else {
      input.textContent = changeSign(input.textContent);
      firstOperand = input.textContent;
    }
  } else if (currentValue === ".") {
    formDecimals();
  } else if (currentValue === "=") {
    if (operator && firstOperand && secondOperand) {
      giveResult();
    }
  } else if (currentValue.match(digitsRegex)) {
    if (result) {
      cleanResult();
      input.textContent = "";
    }
    if (!operator) firstOperand += currentValue;
    else {
      if (!secondOperand) input.textContent = "";
      secondOperand += currentValue;
    }
    input.textContent += currentValue;
  } else if (currentValue.match(operatorsRegex)) {
    if (result) {
      firstOperand = result;
      cleanResult();
    }
    if (operator && firstOperand && secondOperand) {
      giveResult();
    }
    if (!firstOperand && !secondOperand) {
      operator = "";
    } else {
      operator = e.target;
      operator.style.opacity = 0.8;
    }
  }
};

containerCalculator.addEventListener("click", showInDisplay);

backspace.addEventListener("click", () => {
  if (input.textContent) {
    if (secondOperand) {
      input.textContent = input.textContent.slice(0, -1);
      secondOperand = input.textContent;
    } else {
      input.textContent = input.textContent.slice(0, -1);
      firstOperand = input.textContent;
    }
  } else {
    cleanInput();
    cleanResult();
    cleanVars();
  }
});
