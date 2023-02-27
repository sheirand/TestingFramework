const { Browser } = require('../browser/browser.js');

class BaseElement{

    static #driver = Browser.getInstance();

    constructor(name, uniqLocator){
        this.name = name;
        this.uniqLocator = uniqLocator;
    }

    async getElement(){
        return await BaseElement.#driver.findElement(this.uniqLocator);
    }

    async isPresent(){
        return await BaseElement.#driver.elementIsDisplayed(this.uniqLocator);
    }

    async click(){
        const element = await this.getElement();
        console.info(`Clicking on ${this.name}...`)
        await BaseElement.#driver.scrollToElement(element);
        await BaseElement.#driver.elementIsDisplayed(this.uniqLocator);
        await element.click();
    }

};

module.exports = {
    BaseElement,
};
