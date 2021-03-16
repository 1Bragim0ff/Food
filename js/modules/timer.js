import {addZeroToNumber} from '../services/services.js';

export default class Timer {
    constructor({timerDaysSelector, timerHoursSelector, timerMinutesSelector, timerSecondsSelector, date}) {
        this.timerDays = document.querySelector(timerDaysSelector);
        this.timerHours = document.querySelector(timerHoursSelector);
        this.timerMinutes = document.querySelector(timerMinutesSelector);
        this.timerSeconds = document.querySelector(timerSecondsSelector);
        this.date = date;
        this.timer = null;
    }

    init() {
        this.setTimeForTimer();
        this.timer = setInterval(this.setTimeForTimer.bind(this), 1000);
    }

    calcTimeForTimer(date) {
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

    setTimeForTimer() {
        let {days, hours, minutes, seconds} = this.calcTimeForTimer(this.date);

        if (seconds < 0) {
            this.timerDays.textContent = 0;
            this.timerHours.textContent = 0;
            this.timerMinutes.textContent = 0;
            this.timerSeconds.textContent = 0;
        } else {
            this.timerDays.textContent = addZeroToNumber(days);
            this.timerHours.textContent = addZeroToNumber(hours);
            this.timerMinutes.textContent = addZeroToNumber(minutes);
            this.timerSeconds.textContent = addZeroToNumber(seconds);
        }
    }

}