const { BrowserFactory } = require('../browser/browser.js');


class BaseForm{
    static #driver = BrowserFactory.getInstance();
    
    constructor(name, uniqLocator) {
        this.name = name,
        this.uniqLocator = uniqLocator           
    }

    isPageOpened(){
        return BaseForm.#driver.elementIsDisplayed(this.uniqLocator);
    }
};
