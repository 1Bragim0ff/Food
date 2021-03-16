import {getJSON} from '../services/services.js';


export default class Card {
    constructor({menuFieldSelector, urlGet}) {
        this.menuFieldContainer = document.querySelector(menuFieldSelector).children[0];
        this.url = urlGet;
    }

    init() {
        getJSON(this.url).then(cards => {
            cards.forEach(card => {
                let element = new CardTemplate(
                    `${card.img}`,
                    `${card.title}`,
                    `${card.descr}`,
                    card.price
                ).createElement();

                this.menuFieldContainer.append(element);
            });
        });
    }
        
}

class CardTemplate {
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

        return element;
    }
}