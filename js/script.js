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
            if (e.target == modal || e.target == modalClose) modalDisplaySwitch();
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

    async function getCards() {
        const response = await fetch('http://localhost:3000/menu');
        return response.json();
    }

    getCards().then(cards => {
        cards.forEach(card => {
            new Card(
                `${card.img}`,
                `${card.title}`,
                `${card.descr}`,
                card.price
            ).createElement();
        });
    });


    // Contact with me

    const forms = document.querySelectorAll('form');

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


    // Slider

    const slidersWrapper = document.querySelector('.offer__slider-wrapper');
    const slidersOuter = document.querySelector('.offer__slider-outer');
    const slideWidth = getComputedStyle(slidersWrapper).width;

    const sliders = document.querySelectorAll('.offer__slide');
    const sliderCurrentCounter = document.querySelector('#current');
    const sliderTotalCounter = document.querySelector('#total');
    const sliderButtonNext = document.querySelector('.offer__slider-next');
    const sliderButtonPrev = document.querySelector('.offer__slider-prev');

    const sliderIndicator = document.createElement('div');
    sliderIndicator.classList.add('carousel-indicators');
    slidersWrapper.append(sliderIndicator);

    for(let i = 1; i <= sliders.length; i++) {
        const indicatorDot = document.createElement('div');
        indicatorDot.classList.add('dot');
        indicatorDot.dataset.id = i - 1;
        sliderIndicator.append(indicatorDot);
    }

    const indicatorsDot = document.querySelectorAll('.dot');

    let currentSlider = 2;
    refreshCounter();
    
    slidersOuter.style.width = `${parseInt(slideWidth) * sliders.length}px`;
    slidersOuter.style.transform = `translateX(-${parseInt(slideWidth)*currentSlider}px)`;

    sliderButtonNext.addEventListener('click', () => {
        currentSlider == sliders.length-1 ? currentSlider = 0 : currentSlider++;
        refrestSlider(currentSlider);
        refreshCounter(currentSlider);
    });

    sliderButtonPrev.addEventListener('click', () => {
        currentSlider == 0 ? currentSlider = +sliderTotalCounter.textContent-1 : currentSlider--;
        refrestSlider(currentSlider);
        refreshCounter(currentSlider);
    });

    indicatorsDot.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            console.log(event.target.dataset.id);
            refreshCounter(parseInt(event.target.dataset.id));
        });
    });

    function refreshCounter(index = currentSlider) {
        sliderTotalCounter.textContent = addZeroToNumber(sliders.length);
        sliderCurrentCounter.textContent = addZeroToNumber(index + 1);

        indicatorsDot.forEach(indicator => {
            indicator.style.opacity = 0.5;
        });

        indicatorsDot[index].style.opacity = 1;
        refrestSlider(index);
    }

    function refrestSlider (currentSlider) {
        slidersOuter.style.transform = `translateX(-${parseInt(slideWidth)*currentSlider}px)`;
    }

    
});