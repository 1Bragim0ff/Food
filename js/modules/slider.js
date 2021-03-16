import {addZeroToNumber} from '../services/services.js';

export default class Slider {
    constructor({
        slidersWrapperSelector,
        slidersOuterSelector,
        slidersSelector,
        sliderCurrentCounterSelector,
        sliderTotalCounterSelector,
        sliderButtonNextSelector,
        sliderButtonPrevSelector,
    }) {
        this.slidersWrapper = document.querySelector(slidersWrapperSelector);
        this.slidersOuter = document.querySelector(slidersOuterSelector);
        this.slideWidth = getComputedStyle(this.slidersWrapper).width;
        this.sliders = document.querySelectorAll(slidersSelector);
        this.sliderCurrentCounter = document.querySelector(sliderCurrentCounterSelector);
        this.sliderTotalCounter = document.querySelector(sliderTotalCounterSelector);
        this.sliderButtonNext = document.querySelector(sliderButtonNextSelector);
        this.sliderButtonPrev = document.querySelector(sliderButtonPrevSelector);
        this.indicatorsDot = [];
        this.currentSlider = 2;
    }


    init() {
        this.createIndicators();
        this.refreshCounter();
        this.slidersOuter.style.width = `${parseInt(this.slideWidth) * this.sliders.length}px`;
        this.slidersOuter.style.transform = `translateX(-${parseInt(this.slideWidth)*this.currentSlider}px)`;

        this.sliderButtonNext.addEventListener('click', () => {
            this.currentSlider == this.sliders.length-1 ? this.currentSlider = 0 : this.currentSlider++;
            this.refreshSlider(this.currentSlider);
            this.refreshCounter(this.currentSlider);
        });

        this.sliderButtonPrev.addEventListener('click', () => {
            this.currentSlider == 0 ? this.currentSlider = +this.sliderTotalCounter.textContent-1 : this.currentSlider--;
            this.refreshSlider(this.currentSlider);
            this.refreshCounter(this.currentSlider);
        });

        this.indicatorsDot.forEach(indicator => {
            indicator.addEventListener('click', (event) => {
                this.currentSlider = parseInt(event.target.dataset.id);
                this.refreshCounter(parseInt(event.target.dataset.id));
            });
        });

    }


    refreshCounter(index = this.currentSlider) {
        this.sliderTotalCounter.textContent = addZeroToNumber(this.sliders.length);
        this.sliderCurrentCounter.textContent = addZeroToNumber(index + 1);

        this.indicatorsDot.forEach(indicator => {
            indicator.style.opacity = 0.5;
        });

        this.indicatorsDot[index].style.opacity = 1;
        this.refreshSlider();
    }

    refreshSlider () {
        this.slidersOuter.style.transform = `translateX(-${parseInt(this.slideWidth)*this.currentSlider}px)`;
    }


    createIndicators() {
        const sliderIndicator = document.createElement('div');
        sliderIndicator.classList.add('carousel-indicators');
        this.slidersWrapper.append(sliderIndicator);

        for(let i = 1; i <= this.sliders.length; i++) {
            const indicatorDot = document.createElement('div');
            indicatorDot.classList.add('dot');
            indicatorDot.dataset.id = i - 1;
            sliderIndicator.append(indicatorDot);
            this.indicatorsDot.push(indicatorDot); 
        }
    }
}