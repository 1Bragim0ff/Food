import Tabs from './modules/tabs.js';
import Timer from './modules/timer.js';
import Modal from './modules/modal.js';
import Card from './modules/cards.js';
import Contacts from './modules/contacts.js';
import Slider from './modules/slider.js';
import Calculator from './modules/calculator.js';

window.addEventListener('DOMContentLoaded', () => {

    try {
        new Tabs({
            tabsSelector: '.tabheader__item',
            tabsContentSelector: '.tabcontent',
            tabsParentSelector: '.tabheader__items',
        }).init();
    } catch(e) {
        console.error(e);
    }

    try {
        new Timer({
            timerDaysSelector: '#days',
            timerHoursSelector: '#hours',
            timerMinutesSelector: '#minutes',
            timerSecondsSelector: '#seconds',
            date: '2021-04-17'
        }).init();
    } catch(e) {
        console.error(e);
    }

    try {
        new Modal({
            modalSelector: '.modal',
            ButtonSelector: 'button[data-modal]',
            modalCloseSelector: 'div[data-close]',
        }).init();
    } catch(e) {
        console.error(e);
    }

    try {
        new Card({
            menuFieldSelector: '.menu__field',
            urlGet: 'http://localhost:3000/menu',
        }).init();    
    } catch(e) {
        console.error(e);
    }

    try {    
        new Contacts({
            form: 'form',
            urlPost: 'server.php',
        }).init();
    } catch(e) {
        console.error(e);
    }

    try {    
        new Slider({
            slidersWrapperSelector: '.offer__slider-wrapper',
            slidersOuterSelector: '.offer__slider-outer',
            slidersSelector: '.offer__slide',
            sliderCurrentCounterSelector: '#current',
            sliderTotalCounterSelector: '#total',
            sliderButtonNextSelector: '.offer__slider-next',
            sliderButtonPrevSelector: '.offer__slider-prev',
        }).init();
    } catch(e) {
        console.error(e);
    }

    try {    
        new Calculator({
            chooseGenderSelector: '#gender',
            chooseActionSelector: '#action',
            chooseConstitutionSelector: '#constitution',
        }).init();
    } catch(e) {
        console.error(e);
    }

});