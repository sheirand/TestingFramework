const { BaseElement } = require('./base-element.js');
const { Browser } = require('../browser/browser.js');
const { By } = require('selenium-webdriver');

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

module.exports = {
    WebTable
};
