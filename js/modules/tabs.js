export default class Tabs {
    constructor({tabsSelector, tabsContentSelector, tabsParentSelector}) {
        this.tabsSelector = tabsSelector.slice(1);

        this.tabs = document.querySelectorAll(tabsSelector);
        this.tabsContent = document.querySelectorAll(tabsContentSelector);
        this.tabsParent = document.querySelector(tabsParentSelector);
    }

    init() {
        this.hideTabsContent();
        this.showTabsContent();
        this.tabsParent.addEventListener('click', (event) => {
            if(event.target.classList.contains(this.tabsSelector)){
                console.log('ok');
                this.tabs.forEach( (item, i) => {
                    if (item == event.target) {
                        this.hideTabsContent();
                        this.showTabsContent(i);
                    }
                });
            }
        });
    }

    hideTabsContent() {
        this.tabsContent.forEach( item => {
            item.classList.add('hide');
            item.classList.remove('fade');
        });

        this.tabs.forEach(item => {
            item.classList.remove(`${this.tabsSelector}_active`);
        });
    }

    showTabsContent(index = 0) {
        this.tabsContent[index].classList.add('fade');
        this.tabsContent[index].classList.remove('hide');
        
        this.tabs[index].classList.add(`${this.tabsSelector}_active`);
    }
}