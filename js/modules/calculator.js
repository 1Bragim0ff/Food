export default class Calculator {
    constructor({
        chooseGenderSelector, 
        chooseActionSelector, 
        chooseConstitutionSelector,
        userHeight
        }) {
        this.chooseGender = document.querySelector(chooseGenderSelector);
        this.chooseAction = document.querySelector(chooseActionSelector);
        this.chooseConstitution = document.querySelector(chooseConstitutionSelector);


        this.selectedGender = null;
        this.selectedAction = null;
        this.BMR = null;
    }

    init() {
        this.calculateCalories();

        this.chooseGender.addEventListener('click', (event) => {
            if(event.target.classList.contains('calculating__choose-item')) {
                this.refreshChoose(event.target);
                this.calculateCalories();
            }
        });

        this.chooseAction.addEventListener('click', (event) => {
            if(event.target.classList.contains('calculating__choose-item')) {
                this.refreshChoose(event.target);
                this.calculateCalories();
            }
        });

        this.chooseConstitution.addEventListener('input', (event) => {
            this.calculateCalories();
        });
    }

    refreshChoose(item) {
        for(let child of item.parentElement.children) {
            child.classList.remove('calculating__choose-item_active');
        }
        item.classList.add('calculating__choose-item_active');
    }

    calculateCalories() {

        let userHeight = document.querySelector('#height').value,
            userWeight = document.querySelector('#weight').value,
            userAge = document.querySelector('#age').value,
            calorieRate = document.querySelector('.calculating__result').querySelector('span');

        for(let item of this.chooseGender.children) {
            if(item.classList.contains('calculating__choose-item_active')) {
                this.selectedGender = item.textContent;
            }
        }

        for(let item of this.chooseAction.children) {
            if(item.classList.contains('calculating__choose-item_active')) {
                item.textContent === 'Низкая активность' ? this.selectedAction = 1.375 :
                item.textContent === 'Невысокая активность' ? this.selectedAction = 1.55 :
                item.textContent === 'Умеренная активность' ? this.selectedAction = 1.725 :
                item.textContent === 'Высокая активность' ? this.selectedAction = 1.9 : undefined;
            }
        }

        // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
        // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)

        if (this.selectedGender === 'Мужчина') {
            this.BMR = 88.36 + (13.4 * +userWeight) + (3.1 * +userHeight) - (5.7 * userAge);
            calorieRate.textContent = (this.BMR * this.selectedAction).toFixed(0);
        } else if (this.selectedGender === 'Женщина') {
            this.BMR = 447.6 + (9.2 * +userWeight) + (3.1 * +userHeight) - (4.3 * userAge);
            calorieRate.textContent = (this.BMR * this.selectedAction).toFixed(0);
        }

    }


}