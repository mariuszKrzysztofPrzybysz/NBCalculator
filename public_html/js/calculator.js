/* 
 *  Created on : 2017-02-18, 11:59:06
 *  Author     : Mariusz Krzysztof Przybysz
 *  GitHub     : https://github.com/mariuszKrzysztofPrzybysz
 */
var calculator = (function () {

    var _memory = null;
    var _dyadicOperator = null;
    var _binaryOperator = null;
    var _digit = null;
    var _dot = null;
    var _execute = null;
    var _calculations = null;
    var _result = null;
    var _backspace = null;
    var _isOn = null;
    var _previousNumber = null;
    var _operationSign = null;
    var _innerMemory = null;
    var _errorUnknownKey = 'Key?';
    var _errorInvalidOperation = "Invalid operation"; //(-4)!, sqrt(-2), 12%0, 13/0

    var _calculations = null;
    var _result = null;
    function _setDefaultValues() {
        _previousNumber = null;
        _operationSign = null;
        _innerMemory = null;
        _errorUnknownKey = 'Key?';
        _errorInvalidOperation = "Invalid operation"; //(-4)!, sqrt(-2), 12%0, 13/0

        _calculations.value = '';
        _result.value = '';
    }
    ;
    function _toNumber(value) {
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
    }
    ;
    function _connectWithAll() {
        _memory = document.querySelectorAll('.memoryKey');
        _dyadicOperator = document.querySelectorAll('.dyadicOperatorKey');
        _binaryOperator = document.querySelectorAll('.binaryOperatorKey');
        _digit = document.querySelectorAll('.digitKey');
        _dot = document.querySelector('#dotKey');
        _execute = document.querySelector('#executeKey');
        _calculations = document.querySelector('#historyOfCalculations');
        _result = document.querySelector('#resultInput');
        _backspace = document.querySelector('#backspaceKey');
    }
    ;
    function _eventForResult() {
        this.value = '';
    }
    ;
    function _eventForOperations() {
        this.value = '';
    }
    ;
    function _eventForMemoryKey() {
        switch (this.innerText) {
            case "MR":
                if (_innerMemory === null) {
                    _innerMemory = _toNumber(_result.value);
                    _result.value = '';
                } else {
                    _result.value = _innerMemory;
                }
                break;
            case "MC":
                _innerMemory = null;
                break;
            case "M+":
                if (isNaN(_result.value) === false) {
                    if (_innerMemory === null) {
                        _innerMemory = 0;
                    }
                    _innerMemory += _toNumber(_result.value);
                }
                break;
            case "M-":
                if (isNaN(_result.value) === false) {
                    if (_innerMemory === null) {
                        _innerMemory = 0;
                    }
                    _innerMemory -= _toNumber(_result.value);
                }
                break;
            default:
                console.log(_errorUnknownKey);
                break;
        }
        if (_innerMemory !== null) {
            _calculations.value
                    = 'Pamięć: ' + _innerMemory + '\n'
                    + _calculations.value;
        } else {
            _calculations.value
                    = 'Pamięć: wyczyszczono' + '\n'
                    + _calculations.value;
        }
    }
    ;
    function _eventForDyadicOperatorKey() {
        var number = _toNumber(_result.value);
        switch (this.id) {
            case 'factorialOperator':
                //Badanie, czy number jest liczbą naturalną
                if (number >= 0 && Math.floor(number) === number) {
                    //Obliczanie silni
                    var r = 1;
                    for (var i = 1; i <= number; i++) {
                        r *= i;
                    }
                    _result.value = r;
                } else {
                    _result.value = _errorInvalidOperation;
                }
                //Wydruk operacji postaci (number)!: result
                _calculations.value =
                        '(' + number + ')' + '!: ' + _result.value + '\n'
                        + _calculations.value;
                break;
            case 'rootOperator':
                if (number >= 0) {
                    //Liczenie pierwiastka kwadratowego z liczby nieujemnej
                    _result.value = _toNumber(Math.sqrt(number));
                } else {
                    _result.value = _errorInvalidOperation;
                }
                //Wydruk operacji postaci sqrt(number): result
                _calculations.value = this.innerText + '(' + number + ')' + ': '
                        + _result.value + '\n'
                        + _calculations.value;
                break;
            default:
                console.log(this.errorUnknownKey);
                break;
        }

    }
    ;
    function _eventForDigitKey() {
        if (isNaN(_result.value) && _result.value !== "-") {
            _result.value = this.innerText;
        }
        _result.value += this.innerText;
    }
    ;
    function _eventForDotKey() {
        if (_result.value === "") {
            _result.value = "0.";
        } else if (_result.value.indexOf(".") === -1) {
            _result.value += ".";
        }
    }
    ;
    function _calculateResult(firstNumber, operationSign, secondNumber) {
        switch (operationSign) {
            case '%':
                if (Math.floor(firstNumber) === firstNumber
                        && Math.floor(secondNumber) === secondNumber
                        && secondNumber !== 0) {
                    return firstNumber % secondNumber;
                }
                return _errorInvalidOperation;
            case '/':
                if (secondNumber !== 0) {
                    return firstNumber / secondNumber;
                }
                return _errorInvalidOperation;
            case '*':
                return firstNumber * secondNumber;
            case '-':
                return firstNumber - secondNumber;
            case '+':
                return firstNumber + secondNumber;
            default:
                return _errorUnknownKey;
        }
    }
    ;
    function _eventForBinaryOperatorKey() {
        if (_result.value === _errorInvalidOperation
                || _result.value === _errorUnknownKey) {
            _result.value = '';
        }
        if (_result.value === '') {
            if (this.innerText === '-') {
                _result.value = '-';
            }
        } else {
            if (_previousNumber === null) {
                _previousNumber = _toNumber(_result.value);
                _operationSign = this.innerText;
                _result.value = '';
            } else {
                var temp = '(' + _previousNumber + ')'
                        + _operationSign
                        + '(' + _result.value + '): ';
                _previousNumber = _calculateResult(_previousNumber,
                        _operationSign,
                        _toNumber(_result.value));
                _calculations.value = temp + _previousNumber
                        + '\n'
                        + _calculations.value;
                _result.value = '';
                _operationSign = this.innerText;
            }
        }
    }
    ;
    function _eventForExecuteKey() {
        if (_previousNumber !== null
                && _operationSign !== null
                && !isNaN(_result.value)) {
            var temp = '(' + _previousNumber + ')'
                    + _operationSign
                    + '(' + _result.value + '): ';
            _calculations.value = temp + _calculateResult(_previousNumber,
                    _operationSign,
                    _toNumber(_result.value));
            _previousNumber = null;
            _operationSign = null;
            _result.value = '';
        }
    }
    ;
    function _eventForBackspaceKey() {
        _result.value = _result.value.slice(0, -1);
    }
    ;
    function _activateAllEvents() {
        _setDefaultValues();
        _result.addEventListener('dblclick', _eventForResult, false);
        _calculations.addEventListener('dblclick', _eventForOperations, false);
        for (var index = 0; index < _memory.length; index++) {
            _memory[index].addEventListener('click',
                    _eventForMemoryKey, false);
        }
        for (var index = 0; index < _dyadicOperator.length; index++) {
            _dyadicOperator[index].addEventListener('click',
                    _eventForDyadicOperatorKey, false);
        }
        for (var index = 0; index < _binaryOperator.length; index++) {
            _binaryOperator[index].addEventListener('click',
                    _eventForBinaryOperatorKey, false);
        }
        for (var index = 0; index < _digit.length; index++) {
            _digit[index].addEventListener('click',
                    _eventForDigitKey, false);
        }
        _dot.addEventListener('click', _eventForDotKey, false);
        _execute.addEventListener('click', _eventForExecuteKey, false);
        _backspace.addEventListener('click', _eventForBackspaceKey, false);
    }
    ;
    function _deactivateAllEvents() {
        _setDefaultValues();
        _result.removeEventListener('dblclick', _eventForResult, false);
        _calculations.removeEventListener('dblclick', _eventForOperations, false);
        for (var index = 0; index < _memory.length; index++) {
            _memory[index].removeEventListener('click',
                    _eventForMemoryKey, false);
        }
        for (var index = 0; index < _dyadicOperator.length; index++) {
            _dyadicOperator[index].removeEventListener('click',
                    _eventForDyadicOperatorKey, false);
        }
        for (var index = 0; index < _binaryOperator.length; index++) {
            _binaryOperator[index].removeEventListener('click',
                    _eventForBinaryOperatorKey, false);
        }
        for (var index = 0; index < _digit.length; index++) {
            _digit[index].removeEventListener('click', _eventForDigitKey, false);
        }
        _dot.removeEventListener('click', _eventForDotKey, false);
        _execute.removeEventListener('click', _eventForExecuteKey, false);
        _backspace.removeEventListener('click', _eventForBackspaceKey, false);
    }
    ;
    function _run() {
        _connectWithAll();
    }
    ;
//wszystko co zwracam staje się dostępne na zewnątrz,
//cała reszta będzie ukryta dla zewnętrznego środowiska
    return {
        run: _run,
        activateAllEvents: _activateAllEvents,
        deactivateAllEvents: _deactivateAllEvents,
        isOn: _isOn
    };
})();