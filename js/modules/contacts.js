import {postJSON} from '../services/services.js';

export default class Forms {
    constructor({forms, urlPost}) {
        this.forms = document.querySelectorAll('form');
        this.url = urlPost;
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
    
                const formData = new FormData(form);
    
                postJSON(this.url, formData);
            });
        });
    }
}