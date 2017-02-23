/* 
 *  Created on : 2017-02-21, 11:59:06
 *  Author     : Mariusz Krzysztof Przybysz
 *  GitHub     : https://github.com/mariuszKrzysztofPrzybysz
 */

var calculator = {
    memory: null,
    dyadicOperator: null,
    binaryOperator: null,
    digit: null,
    dot: null,
    execute: null,
    calculations: null,
    result: null,
    del: null,
    isOn: false,
    setDefaultValues: function () {
        this.previousNumber = null;
        this.operationSign = null;
        this.innerMemory = null;
        this.errorUnknownKey = 'Key?';
        this.errorInvalidOperation = "Invalid operation"; //(-4)!, sqrt(-2), 12%0, 13/0

        this.calculations.value = '';
        calculator.result.value = '';
    },
    toNumber: function (value) {
        //Funkcja zwraca albo null albo liczbę
        if (typeof (value) === 'string') {
            if (isNaN(value) === false) {
                return Number(value);
            }
            return null;
        } else if (typeof (value) === 'number') {
            return value;
        } else
            return null;
    },
    connectWithAll: function () {
        this.memory = document.querySelectorAll('.memoryKey');
        this.dyadicOperator = document.querySelectorAll('.dyadicOperatorKey');
        this.binaryOperator = document.querySelectorAll('.binaryOperatorKey');
        this.digit = document.querySelectorAll('.digitKey');
        this.dot = document.querySelector('#dotKey');
        this.execute = document.querySelector('#executeKey');
        this.calculations = document.querySelector('#historyOfCalculations');
        this.result = document.querySelector('#resultInput');
        this.del = document.querySelector('#deleteKey');
    },
    eventForResult: function () {
        this.value = '';
    },
    eventForOperations: function () {
        this.value = '';
    },
    eventForMemoryKey: function () {
        switch (this.innerText) {
            case "MR":
                if (calculator.innerMemory === null) {
                    calculator.innerMemory = calculator.toNumber(calculator.result.value);
                    calculator.result.value = '';
                } else {
                    calculator.result.value = calculator.innerMemory;
                }
                break;
            case "MC":
                calculator.innerMemory = null;
                //calculator.calculations.value = '';
                break;
            case "M+":
                if (isNaN(calculator.result.value) === false) {
                    if (calculator.innerMemory === null) {
                        calculator.innerMemory = 0;
                    }
                    calculator.innerMemory += calculator.toNumber(calculator.result.value);
                }
                break;
            case "M-":
                if (isNaN(calculator.result.value) === false) {
                    if (calculator.innerMemory === null) {
                        calculator.innerMemory = 0;
                    }
                    calculator.innerMemory -= calculator.toNumber(calculator.result.value);
                }
                break;
            default:
                console.log(this.errorUnknownKey);
                break;
        }
        if (calculator.innerMemory !== null) {
            calculator.calculations.value
                    = 'Pamięć: ' + calculator.innerMemory + '\n'
                    + calculator.calculations.value;
        } else {
            calculator.calculations.value
                    = 'Pamięć: wyczyszczono' + '\n'
                    + calculator.calculations.value;
        }
    },
    eventForDyadicOperatorKey: function () {
        var number = calculator.toNumber(calculator.result.value);
        switch (this.id) {
            case 'factorialOperator':
                //Badanie, czy number jest liczbą naturalną
                if (number >= 0 && Math.floor(number) !== number) {
                    //Obliczanie silni
                    var r = 1;
                    for (var i = 1; i <= number; i++) {
                        r *= i;
                    }
                    calculator.result.value = r;
                } else {
                    calculator.result.value = calculator.errorInvalidOperation;
                }
                //Wydruk operacji postaci (number)!: result
                calculator.calculations.value =
                        '(' + number + ')' + '!: ' + calculator.result.value + '\n'
                        + calculator.calculations.value;
                break;
            case 'rootOperator':
                if (number >= 0) {
                    //Liczenie pierwiastka kwadratowego z liczby nieujemnej
                    calculator.result.value = calculator.toNumber(Math.sqrt(number));
                } else {
                    calculator.result.value = calculator.errorInvalidOperation;
                }
                //Wydruk operacji postaci sqrt(number): result
                calculator.calculations.value = this.innerText + '(' + number + ')' + ': '
                        + calculator.result.value + '\n'
                        + calculator.calculations.value;
                break;
            default:
                console.log(this.errorUnknownKey);
                break;
        }
    },
    eventForDigitKey: function () {
        if (isNaN(calculator.result.value) && calculator.result.value !== "-") {
            calculator.result.value = this.innerText;
        }
        calculator.result.value += this.innerText;
    },
    eventForDotKey: function () {
        if (calculator.result.value === "") {
            calculator.result.value = "0.";
        } else if (calculator.result.value.indexOf(".") === -1) {
            calculator.result.value += ".";
        }
    },
    calculateResult: function (firstNumber, operationSign, secondNumber) {
        switch (operationSign) {
            case '%':
                if (Math.floor(firstNumber) === firstNumber
                        && Math.floor(secondNumber) === secondNumber
                        && secondNumber !== 0) {
                    return firstNumber % secondNumber;
                }
                return calculator.errorInvalidOperation;
            case '/':
                if (secondNumber !== 0) {
                    return firstNumber / secondNumber;
                }
                return calculator.errorInvalidOperation;
            case '*':
                return firstNumber * secondNumber;
            case '-':
                return firstNumber - secondNumber;
            case '+':
                return firstNumber + secondNumber;
            default:
                return calculator.errorUnknownKey;
        }
    },
    eventForBinaryOperatorKey: function () {
        if (calculator.result.value === calculator.errorInvalidOperation
                || calculator.result.value === calculator.errorUnknownKey) {
            calculator.result.value = '';
        }
        if (calculator.result.value === '') {
            if (this.innerText === '-') {
                calculator.result.value = '-';
            }
        } else {
            //Na wyświetlaczu jest liczba
            if (calculator.previousNumber === null) {
                calculator.previousNumber = calculator.toNumber(calculator.result.value);
                calculator.operationSign = this.innerText;
                calculator.result.value = '';
            } else {
                console.log(calculator.previousNumber, calculator.operationSign, calculator.toNumber(calculator.result.value));
                calculator.previousNumber = calculator.calculateResult(calculator.previousNumber,
                        calculator.operationSign,
                        calculator.toNumber(calculator.result.value));
                calculator.calculations.value = 'Wynik: ' + calculator.previousNumber;
                calculator.result.value = '';
                calculator.operationSign = this.innerText;
            }

        }
    },
    eventForExecuteKey: function () {
        if (calculator.previousNumber !== null
                && calculator.operationSign != null
                && !isNaN(calculator.result.value)) {
            calculator.calculations.value = 'Wynik: ' + calculator.calculateResult(calculator.previousNumber,
                    calculator.operationSign,
                    calculator.toNumber(calculator.result.value));
            calculator.previousNumber = null;
            calculator.operationSign = null;
            calculator.result.value = '';
        }
    },
    eventForDeleteKey: function () {
        calculator.result.value = calculator.result.value.slice(0, -1);
    },
    activateAllEvents: function () {
        this.setDefaultValues();
        this.result.addEventListener('dblclick', this.eventForResult, false);
        this.calculations.addEventListener('dblclick', this.eventForOperations, false);
        for (var index = 0; index < this.memory.length; index++) {
            this.memory[index].addEventListener('click',
                    this.eventForMemoryKey, false);
        }
        for (var index = 0; index < this.dyadicOperator.length; index++) {
            this.dyadicOperator[index].addEventListener('click',
                    this.eventForDyadicOperatorKey, false);
        }
        for (var index = 0; index < this.binaryOperator.length; index++) {
            this.binaryOperator[index].addEventListener('click',
                    this.eventForBinaryOperatorKey, false);
        }
        for (var index = 0; index < this.digit.length; index++) {
            this.digit[index].addEventListener('click',
                    this.eventForDigitKey, false);
        }
        this.dot.addEventListener('click', this.eventForDotKey, false);
        this.execute.addEventListener('click', this.eventForExecuteKey, false);
        this.del.addEventListener('click', this.eventForDeleteKey, false);
    },
    deactivateAllEvents: function () {
        this.setDefaultValues();
        this.result.removeEventListener('dblclick', this.eventForResult, false);
        this.calculations.removeEventListener('dblclick', this.eventForOperations, false);
        for (var index = 0; index < this.memory.length; index++) {
            this.memory[index].removeEventListener('click',
                    this.eventForMemoryKey, false);
        }
        for (var index = 0; index < this.dyadicOperator.length; index++) {
            this.dyadicOperator[index].removeEventListener('click',
                    this.eventForDyadicOperatorKey, false);
        }
        for (var index = 0; index < this.binaryOperator.length; index++) {
            this.binaryOperator[index].removeEventListener('click',
                    this.eventForBinaryOperatorKey, false);
        }
        for (var index = 0; index < this.digit.length; index++) {
            this.digit[index].removeEventListener('click', this.eventForDigitKey, false);
        }
        this.dot.removeEventListener('click', this.eventForDotKey, false);
        this.execute.removeEventListener('click', this.eventForExecuteKey, false);
        this.del.removeEventListener('click', this.eventForDeleteKey, false);
    },
    run: function () {
        this.connectWithAll();
    }
};
window.onload = function () {
    calculator.run();
    var powerKey = document.querySelector('#powerKey');
    powerKey.addEventListener('click', function () {
        var table = document.querySelector('table');
        if (!calculator.isOn) {
            calculator.activateAllEvents();
            table.classList.add('on');
        } else {
            table.classList.remove('on');
            calculator.deactivateAllEvents();
        }
        calculator.isOn = !calculator.isOn;
    }, false);
};

