const { BrowserFactory } = require('../browser/browser.js');


class BaseElement{

    static #driver = BrowserFactory.getInstance();

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
        await BaseElement.#driver.scrollToElement(await this.getElement());
        await (await this.getElement()).click();
    }

};

class Button extends BaseElement{
};

class TextField extends BaseElement{
    async getText(){
        let text = await (await this.getElement()).getText();
        return text
    }
};

class IFrame extends BaseElement{
};

module.exports = {
    BaseElement,
    Button,
    TextField,
    IFrame
};
