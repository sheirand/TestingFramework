const { BrowserFactory } = require('../browser/browser.js');


class BaseElement{

    static #driver = BrowserFactory.getInstance();

    constructor(name, uniqLocator){
        this.name = name;
        this.uniqLocator = uniqLocator;
    }

    getElement(){
        return BaseElement.#driver.findElement(this.uniqLocator);
    }

    isPresent(){
        return BaseElement.#driver.elementIsDisplayed(this.uniqLocator);
    }

    click(){
        this.isPresent();
        return this.getElement().click();
    }

};

class Button extends BaseElement{
};

module.exports = {
    BaseElement,
    Button
};
