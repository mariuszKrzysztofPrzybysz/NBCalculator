/* 
 *  Created on : 2017-02-25, 00:07:19
 *  Author     : Mariusz Krzysztof Przybysz
 *  GitHub     : https://github.com/mariuszKrzysztofPrzybysz
 */

var Language = (function () {
    var _pl = (function () {
        var _MR = 'Zapisanie liczby znajdującej się na wyświetlaczu do pamięci i jej odczyt';
        var _MC = 'Czyszczenie pamięci oraz historii operacji';
        var _MPlus = 'Dodanie do liczby w pamięci liczby znajdującej się aktualnie na wyświetlaczu';
        var _MMinus = 'Odjęcie od liczby w pamięci liczby znajdującej się aktualnie na wyświetlaczu';

        var _getMR = function () {
            return _MR;
        };
        var _getMC = function () {
            return _MC;
        };
        var _getMPlus = function () {
            return _MPlus;
        };
        var _getMMinus = function () {
            return _MMinus;
        };

        return {
            getMR: _getMR,
            getMC: _getMC,
            getMPlus: _getMPlus,
            getMMinus: _getMMinus
        };
    })();
    var _en = (function () {
        var _MR = '';
        var _MC = '';
        var _MPlus = '';
        var _MMinus = '';

        var _getMR = function () {
            return _MR;
        };
        var _getMC = function () {
            return _MC;
        };
        var _getMPlus = function () {
            return _MPlus;
        };
        var _getMMinus = function () {
            return _MMinus;
        };

        return {
            getMR: _getMR,
            getMC: _getMC,
            getMPlus: _getMPlus,
            getMMinus: _getMMinus
        };
    })();
    var _fr = (function () {
        var _MR = '';
        var _MC = '';
        var _MPlus = '';
        var _MMinus = '';

        var _getMR = function () {
            return _MR;
        };
        var _getMC = function () {
            return _MC;
        };
        var _getMPlus = function () {
            return _MPlus;
        };
        var _getMMinus = function () {
            return _MMinus;
        };

        return {
            getMR: _getMR,
            getMC: _getMC,
            getMPlus: _getMPlus,
            getMMinus: _getMMinus
        };
    })();
    var _de = (function () {
        var _MR = '';
        var _MC = '';
        var _MPlus = '';
        var _MMinus = '';

        var _getMR = function () {
            return _MR;
        };
        var _getMC = function () {
            return _MC;
        };
        var _getMPlus = function () {
            return _MPlus;
        };
        var _getMMinus = function () {
            return _MMinus;
        };

        return {
            getMR: _getMR,
            getMC: _getMC,
            getMPlus: _getMPlus,
            getMMinus: _getMMinus
        };
    })();
    var _ru = (function () {
        var _MR = '';
        var _MC = '';
        var _MPlus = '';
        var _MMinus = '';

        var _getMR = function () {
            return _MR;
        };
        var _getMC = function () {
            return _MC;
        };
        var _getMPlus = function () {
            return _MPlus;
        };
        var _getMMinus = function () {
            return _MMinus;
        };

        return {
            getMR: _getMR,
            getMC: _getMC,
            getMPlus: _getMPlus,
            getMMinus: _getMMinus
        };
    })();
    return {
        pl: _pl,
        en: _en,
        fr: _fr,
        de: _de,
        ru: _ru
    };
})();

console.log(Language['pl'].getMPlus());
console.log(Language.pl.getMMinus());
console.log(Language.pl['getMMinus']);

if (typeof (Storage) !== 'undefined') {
    localStorage.setItem('calculatorLanguage', 'pl');
}
console.log(localStorage.getItem('calculatorLanguage'));
localStorage.removeItem('calculatorLanguage');
console.log(localStorage.getItem('calculatorLanguage'));