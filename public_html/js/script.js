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

    setDefaultValues: function () {
        this.firtsNumber = null;
        this.secondNumber = null;
        this.operationSign = "";
        this.innerMemory = null;
        this.maxNumberOfDigits = 8;

        this.errorUnknownKey = 'Key?';
        this.errorMessage = "Error"; //(-4)!, sqrt(-2), 12%0, 13/0
        this.errorOutOfMemoryMessage = "Out of memory";
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
                calculator.calculations.innerHTML = '';
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
            calculator.calculations.innerHTML
                    += 'Pamięć: ' + calculator.innerMemory.toString() + '\n';
        } else {
            calculator.calculations.innerHTML
                    += 'Pamięć: null\n';
        }
    },
    eventForDyadicOperatorKey: function () {
        var number = calculator.toNumber(calculator.result.value);
        switch (this.id) {
            case 'rootOperator':
                if (number >= 0) {
                    /*
                     * Metoda toPrecision wywoływana na obiekcie number z parametrem
                     * calculator.maxNumberOfDigits zwraca zaokrąglenie liczby
                     * za pomocą maxNumberOfDigits cyfr np:
                     * ad. 1) sqrt(2): 1.4142136
                     * ale 
                     * ad. 2) sqrt(4): 2.0000000
                     * Aby rozwiązać problem ad. 2 stosujemy metodę Number
                     */
                    calculator.result.value = Number(Math.sqrt(number).toPrecision(calculator.maxNumberOfDigits));
                } else {
                    calculator.result.value = calculator.errorMessage;
                }
                calculator.calculations.innerHTML += this.innerText + '(' + number + ')' + ': '
                        + calculator.result.value + '\n';
                break;
            case 'factorialOperator':
                //Sprawdzenie, czy number jest liczbą naturalną
                if (number < 0 || Math.floor(number) !== number) {
                    calculator.result.value = calculator.errorMessage;
                } else {
                    var r = 1;
                    for (var i = 1; i <= number; i++) {
                        r *= i;
                    }
                    calculator.result.value = r;
                }
                calculator.calculations.innerHTML +=
                        '(' + number + ')' + '!: ' + calculator.result.value;
                break;
            default:
                console.log(this.errorUnknownKey);
                break;
        }
    },
    eventForBinaryOperatorKey: function () {
        // modulo, dzielenie, mnożenie, odejmowanie, dodawanie
        if (calculator.result.value !== "") {
            if (calculator.firtsNumber === null) {
                calculator.firtsNumber = calculator.toNumber(calculator.result.value);
                console.log(calculator.firtsNumber);
                calculator.result.value = "";
                calculator.operationSign = this.innerText;
            } else {
                calculator.secondNumber = calculator.toNumber(calculator.result.value);
                calculator.eventForExecuteKey();
                calculator.operationSign = this.innerText;
            }
        }
        //na wyświetlaczu nic nie ma oraz urzytkownik wcisnął znak minus
        else if (this.innerText === "-") {
            calculator.result.value = "-";
        }
    },
    eventForDigitKey: function () {
        /*W przypadku, gdy na wyświetlaczu otrzymamy komunikat o błędzie
         oraz nie jest to znak minus
         */
        if (isNaN(calculator.result.value) && calculator.result.value !== "-") {
            calculator.result.value = this.innerText;
        }
        //TODO: Dodać komentarz
        var numberOfDotAndMinusSign = 0;
        numberOfDotAndMinusSign += (calculator.result.value.indexOf('.') === -1 ? 0 : 1);
        numberOfDotAndMinusSign += (calculator.result.value.indexOf('-') === -1 ? 0 : 1);
        if (calculator.result.value.length
                - numberOfDotAndMinusSign
                + this.innerText.length <= calculator.maxNumberOfDigits) {
            calculator.result.value += this.innerText;
        }
    },
    eventForDotKey: function () {
        if (calculator.result.value === "") {
            calculator.result.value = "0.";
        } else if (isNaN(calculator.result.value + ".0") === false) {
            calculator.result.value += ".";
        } else {
            ;
        }
    },

    eventForExecuteKey: function () {
        //TODO: Przemyśleć działanie funkcji
        if (calculator.result.value !== "") {
            if (calculator.firtsNumber === null) {
                calculator.firtsNumber = Number(calculator.result.value);
            } else {
                calculator.secondNumber = Number(calculator.result.value);
            }
            var r = null;
            switch (calculator.operationSign) {
                case "%":
                    if (Math.floor(calculator.firtsNumber) === calculator.firtsNumber
                            && Math.floor(calculator.secondNumber) === calculator.secondNumber
                            && calculator.secondNumber !== 0) {
                        r = calculator.firtsNumber % calculator.secondNumber;
                    } else {
                        r = calculator.errorMessage;
                    }
                    break;
                case "/":
                    if (calculator.secondNumber === 0) {
                        r = calculator.errorMessage;
                    } else {
                        r = calculator.firtsNumber / calculator.secondNumber;
                    }
                    break;
                case "*":
                    r = calculator.firtsNumber * calculator.secondNumber;
                    break;
                case "-":
                    r = calculator.firtsNumber - calculator.secondNumber;
                    break;
                case "+":
                    r = calculator.firtsNumber + calculator.secondNumber;
                    break;
                default:
                    ;
            }
            //Obsłużyć > maxNumberOfDigits
            if (r !== null) {
                calculator.result.value = calculator.toNumber(r);
                calculator.firtsNumber = null;
                calculator.secondNumber === null;
                calculator.operationSign = "";
                console.log("initExecute");
            }
        }
    },
    activateAllEvents: function () {
        //this.setDefaultValues();
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
    },
    deactivateAllEvents: function () {
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
    },
    run: function () {
        this.connectWithAll();
        this.setDefaultValues();
        this.activateAllEvents();
    }
};

window.onload = function () {
    calculator.run();
};