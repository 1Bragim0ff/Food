export default class Modal {
    constructor({modalSelector, ButtonSelector, modalCloseSelector}) {
        this.modal = document.querySelector(modalSelector);
        this.button = document.querySelectorAll(ButtonSelector);
        this.modalClose = document.querySelector(modalCloseSelector);
    }

    init() {
        this.watchModal();
    }

    modalDisplaySwitch() {
        if (getComputedStyle(this.modal).display === 'none') {
            this.modal.style.display = 'block';
        } else {
            this.modal.style.display = 'none';
        }
    }

    watchModal() {
        this.button.forEach(item => {
            item.addEventListener('click', this.modalDisplaySwitch.bind(this));
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target == this.modal || e.target == this.modalClose) this.modalDisplaySwitch();
        });
    }
}
