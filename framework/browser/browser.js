const { Builder, until } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const Firefox = require('selenium-webdriver/firefox');
const cfg = require('../../config.json');


class BrowserFactory{
    
    static getInstance(){
        if (!this.instance) {
            this.instance = this;
        };
        return this.instance;
    }

    static initDriver(browser, args){
        switch(browser){
            case cfg.browser.chrome.name:
                this.options = new Chrome.Options();
                if (args) this.options = this.options.addArguments(args);
                this.driver = new Builder()
                .forBrowser(browser).setChromeOptions(this.options)
                .build();
                break;
            case cfg.browser.firefox.name:
                this.options = new Firefox.Options();
                if (args) this.options = this.options.addArguments(args);
                 this.driver = new Builder()
                 .forBrowser(browser).setFirefoxOptions(this.options)
                 .build();
                 break;
            default:
                throw new Error("Incorrect Browsername");
        }   
    }

    static async getTitle(){
        let title = await this.driver.wait(getTitle());
        return title;
    }

    static async switchToOpenedTab(num){
        let list = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(list[num]);
    }

    static async applyImplicitWaits(value){
        await this.driver.manage().setTimeouts({implicit: value});
    }

    static async findElement(locator){
        let element = await this.driver.wait(until.elementLocated(locator), cfg.waits.long);
        return element;
    }

    static async elementIsDisplayed(locator){
        let isDisplayed = await this.driver.wait(until.elementLocated(locator), cfg.waits.long).isDisplayed();
        return isDisplayed;
    }

    static async findElements(locator){
        let elements = await this.driver.wait(until.elementsLocated(locator), cfg.waits.long);
        return elements;
    }

    static async goToUrl(url){
        await this.driver.get(url);
    }

    static async scrollDownPage(){
        await this.driver.executeScript("window.scrollBy(0,250)", "");
    }

    static async scrollToElement(element){
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element)
    }

    static async getAlert(){
            let alert = await this.driver.switchTo().alert();
            return alert;
        }

    static async quit(){
        await this.driver.quit();
    }
};

module.exports = {
    BrowserFactory
};
