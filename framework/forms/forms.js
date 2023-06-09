const { Browser } = require('../browser/browser.js');


class BaseForm{
    static #driver = Browser.getInstance();
    
    constructor(name, uniqLocator) {
        this.name = name,
        this.uniqLocator = uniqLocator           
    }

    async isPageOpened(){
        console.info(`Checking if the ${this.name} is opened...`);
        return BaseForm.#driver.elementIsDisplayed(this.uniqLocator);
    }
};

module.exports = {
    BaseForm
};
