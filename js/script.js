"use strict";


window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
      
    tabsParent.addEventListener('click', (event) => {
        if(event.target.classList.contains('tabheader__item')){
            tabs.forEach( (item, i) => {
                if (item == event.target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    hideTabsContent();
    showTabsContent();

    function hideTabsContent() {
        tabsContent.forEach( item => {
            item.classList.add('hide');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(index = 0) {
        tabsContent[index].classList.add('fade');
        tabsContent[index].classList.remove('hide');
        
        tabs[index].classList.add('tabheader__item_active');
    }

    // Timer

    const timerDays = document.querySelector('#days'),
          timerHours = document.querySelector('#hours'),
          timerMinutes = document.querySelector('#minutes'),
          timerSeconds = document.querySelector('#seconds');


    setTimeForTimer();
    let timer = setInterval(setTimeForTimer, 1000);

    function addZeroToNumber(number) {
        if(number <= 9) {
            return `0${number}`;
        }
        return number;
    }

    function calcTimeForTimer(date) {
        let specifiedDate = new Date(date);
        let currentDate = new Date();

        let differenceBetweenDate = specifiedDate - currentDate;

        let days = Math.floor(differenceBetweenDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor((differenceBetweenDate / (1000 * 60 * 60) % 24));
        let minutes = Math.floor((differenceBetweenDate / 1000 / 60) % 60);
        let seconds = Math.floor((differenceBetweenDate / 1000) % 60);

        return {
            "days": days, 
            "hours": hours, 
            "minutes": minutes, 
            "seconds": seconds,
        };
    }

    function setTimeForTimer() {
        let {days, hours, minutes, seconds} = calcTimeForTimer('2021-02-26');

        if (seconds < 0) {
            timerDays.textContent = 0;
            timerHours.textContent = 0;
            timerMinutes.textContent = 0;
            timerSeconds.textContent = 0;
        } else {
            timerDays.textContent = addZeroToNumber(days);
            timerHours.textContent = addZeroToNumber(hours);
            timerMinutes.textContent = addZeroToNumber(minutes);
            timerSeconds.textContent = addZeroToNumber(seconds);
        }

        
        
    }

    // Modal

    const modal = document.querySelector('.modal');
    const ConnectWithUsButtons = document.querySelectorAll('button[data-modal]');
    const modalClose = document.querySelector('div[data-close]');

    function modalDisplaySwitch() {
        if (getComputedStyle(modal).display === 'none') {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    }

    function watchModal() {
        ConnectWithUsButtons.forEach(item => {
            item.addEventListener('click', modalDisplaySwitch);
        });

        modal.addEventListener('click', (e) => {
            e.target == modal || e.target == modalClose ? modalDisplaySwitch() : null;
        });
    }

    watchModal();

    // Cards

    const menuFieldContainer = document.querySelector('.menu__field').children[0];

    class Card {
        constructor(srcImage, subtitle, description, price) {
            this.srcImage = srcImage;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
        }

        createElement() {
            const element = document.createElement('div');
            element.classList.add("menu__item");

            element.innerHTML = `
            <img src=${this.srcImage} alt="photo">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            menuFieldContainer.append(element);

        }
    }

    new Card(
        "img/tabs/vegy.jpg",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        540
    ).createElement();

    new Card(
        "img/tabs/post.jpg",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        840
    ).createElement();

    new Card(
        "img/tabs/elite.jpg",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        1260
    ).createElement();



    // Contact with me

    const forms = document.querySelectorAll('form'),
          request = new XMLHttpRequest();

    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            fetch('server.php', {
                method: "POST",
                body: formData,
            })
            .then( response => response.text() )
            .then( response => console.log(response));

        });
    });


});