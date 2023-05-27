//class is a blueprint of what a objct should look like
//The constructor method is a special method of a class for creating and initializing an object instance of that class.

class Calculator {
  constructor(previousOperandTextElemnet, currentOperandTextElemnet) {
    this.previousOperandTextElemnet = previousOperandTextElemnet;
    this.currentOperandTextElemnet = currentOperandTextElemnet;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  //study this one later
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElemnet.innerText = this.getDisplayNumber(
      this.current
    );
    if (this.operation != null) {
      this.previousOperandTextElemnet.innerText = `${this.getDisplayNumber(
        this.previous
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElemnet.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElemnet = document.querySelector("[data-previous]");
const currentOperandTextElemnet = document.querySelector("[data-current]");

const calculator = new Calculator(
  previousOperandTextElemnet,
  currentOperandTextElemnet
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
