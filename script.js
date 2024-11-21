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

let containerCalculator = document.querySelector(".calculator");
let input = document.querySelector("input");
let operation = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";

const cleanVars = () => {
  operation = "";
  operatorIndex = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
};

const cleanResult = () => {
  input.value = "";
};

const giveResult = () => {
  input.value = operate(operator.textContent, firstOperand, secondOperand);
  cleanVars();
  firstOperand = input.value;
};

const changeSign = (number) => {
  return number > 0 ? "-" + number : number;
};

const hasDecimal = (number) => {
  return /\./.test(number);
};

const formDecimals = () => {
  if (secondOperand) {
    if (!hasDecimal(secondOperand)) {
      input.value = secondOperand + ".";
      secondOperand = input.value;
    } else {
      alert("You already have a decimal number!");
    }
  } else if (firstOperand && !operator) {
    if (!hasDecimal(firstOperand)) {
      input.value = firstOperand + ".";
      firstOperand = input.value;
    } else {
      alert("You already have a decimal number!");
    }
  } else if (firstOperand && operator) {
    input.value = "0.";
    secondOperand = "0.";
  } else {
    input.value = "0.";
    firstOperand = "0.";
  }
};

const showInDisplay = (e) => {
  let currentValue = e.target.textContent;

  if (operator) operator.style.opacity = 1;

  if (currentValue === "C") {
    cleanResult();
    cleanVars();
  } else if (currentValue === "%") {
    if (secondOperand) {
      input.value = percentage(input.value);
      secondOperand = input.value;
    } else {
      input.value = percentage(input.value);
      firstOperand = input.value;
    }
  } else if (currentValue === "+/-") {
    if (secondOperand) {
      input.value = changeSign(secondOperand);
      secondOperand = input.value;
    } else {
      input.value = changeSign(firstOperand);
      firstOperand = input.value;
    }
  } else if (currentValue === ".") {
    formDecimals();
  } else if (currentValue === "=") {
    if (operator && firstOperand && secondOperand) giveResult();
  } else if (currentValue.match(digitsRegex)) {
    if (!operator) firstOperand += currentValue;
    else {
      if (!secondOperand) input.value = "";
      secondOperand += currentValue;
    }
    input.value += currentValue;
  } else if (currentValue.match(operatorsRegex)) {
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

  console.log(firstOperand, secondOperand);
};

containerCalculator.addEventListener("click", showInDisplay);
