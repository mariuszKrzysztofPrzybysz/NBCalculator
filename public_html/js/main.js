/* 
 *  Created on : 2017-02-27, 14:12:27
 *  Author     : Mariusz Krzysztof Przybysz
 *  GitHub     : https://github.com/mariuszKrzysztofPrzybysz
 */

document.addEventListener('DOMContentLoaded', function(){

    calculator.run();
    var powerKey = document.querySelector('#powerKey');
    powerKey.addEventListener('click', function () {
        var table = document.querySelector('.calculator');
        if (!calculator.isOn) {
            calculator.activateAllEvents();
            table.classList.add('on');
        } else {
            table.classList.remove('on');
            calculator.deactivateAllEvents();
        }
        calculator.isOn = !calculator.isOn;
    }, false);
    /*
    if (typeof (Storage) !== 'undefined') {

        var languages = document.querySelectorAll(".language-container li");

        for (var i = 0; i < languages.length; i++) {
            languages[i].addEventListener('click', function () {
                localStorage.calculatorLanguage = this.innerText;
                location.reload();
            }, false);
        }
        console.log(localStorage.calculatorLanguage);
        //Jedna z dostępnych możliwości: pl, en, fr, ru, de
        if (localStorage.calculatorLanguage) {
            document.querySelector('#MR').setAttribute('title', Language[localStorage.calculatorLanguage].getMR());
            document.querySelector('#MC').setAttribute('title', Language[localStorage.calculatorLanguage].getMC());
            document.querySelector('#MPlus').setAttribute('title', Language[localStorage.calculatorLanguage].getMPlus());
            document.querySelector('#MMinus').setAttribute('title', Language[localStorage.calculatorLanguage].getMMinus());
        } else {
            localStorage.calculatorLanguage = 'pl';
        }
    }
    */
});