const { BrowserFactory } = require('../browser/browser.js');
const { By } = require('selenium-webdriver');


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
        const element = await this.getElement();
        console.info(`${this.name} is clicked!`)
        await BaseElement.#driver.scrollToElement(element);
        await BaseElement.#driver.elementIsDisplayed(this.uniqLocator);
        await element.click();
    }

};

class Button extends BaseElement{
};

class Label extends BaseElement{
    
    async getText(){
        console.log('blabal')
        let text = await (await this.getElement()).getText();
        return text
    }
};

class IFrame extends BaseElement{
};

class WebTable extends BaseElement{
    #driver = BrowserFactory.getInstance();
    #rowsLocator = By.xpath('//div[contains(@class, "rt-tr-group")]');
    #colsLocator = By.xpath('.//div[contains(@class, "rt-td")]');
    
    async getContent(row, col){
        let rows = await this.#driver.findElements(this.#rowsLocator);
        let row_conent = await rows[row].findElements(this.#colsLocator);
        let content = await row_conent[col].getText();
        return content
    }
};

class TextField extends BaseElement{
    
    async sendKeys(keys){
        (await this.getElement()).sendKeys(keys);
    }

};

module.exports = {
    BaseElement,
    Button,
    Label,
    IFrame,
    WebTable,
    TextField
};
