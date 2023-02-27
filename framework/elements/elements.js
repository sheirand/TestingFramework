const { Browser } = require('../browser/browser.js');
const { By } = require('selenium-webdriver');


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

class Button extends BaseElement{
};

class Label extends BaseElement{
    
    async getText(){
        console.info(`Getting text from ${this.name} label...`);
        let text = await (await this.getElement()).getText();
        return text
    }
};

class WebTable extends BaseElement{
    #driver = Browser.getInstance();
    #rowsLocator = By.xpath('//div[contains(@class, "rt-tr-group")]');
    #colsLocator = By.xpath('.//div[contains(@class, "rt-td")]');
    
    async getContent(row, col){
        console.debug(`Getting content from the Webtable on ${row} row, ${col} col...`);
        let rows = await this.#driver.findElements(this.#rowsLocator);
        let row_conent = await rows[row].findElements(this.#colsLocator);
        let content = await row_conent[col].getText();
        return content
    }
};

class TextField extends BaseElement{
    
    async sendKeys(keys){
        console.info(`Sending ${keys} to the ${this.name}...`);
        (await this.getElement()).sendKeys(keys);
    }

};

module.exports = {
    BaseElement,
    Button,
    Label,
    WebTable,
    TextField
};
