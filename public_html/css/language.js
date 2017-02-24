/* 
 *  Created on : 2017-02-25, 00:07:19
 *  Author     : Mariusz Krzysztof Przybysz
 *  GitHub     : https://github.com/mariuszKrzysztofPrzybysz
 */

var Language = (function () {

    var _MR = '';
    var _MC = '';
    var _MPlus = '';
    var _MMinus = '';

    var _pl = (function () {
        _MR = '';
        _MC = '';
        _MPlus = '';
        _MMinus = '';

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
        _MR = '';
        _MC = '';
        _MPlus = '';
        _MMinus = '';

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
        en: _en
    };
})();

Language.pl.getMC();