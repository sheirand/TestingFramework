const { BrowserFactory } = require('./browser-factory.js');
const { until } = require('selenium-webdriver');
const cfg = require('../../config.json');


class Browser{
    
    static getInstance(){
        if (!this.instance) {
            this.instance = this;
            this.driver = BrowserFactory.initDriver(cfg.browser.name);
        };
        return this.instance;
    }

    static async getTitle(){
        console.info("Getting webpage title...");
        let title = await this.driver.wait(getTitle());
        return title;
    }

    static async getCurrentWindowHandle(){
        console.info("Getting current window handle...");
        return await this.driver.getWindowHandle();
    }

    static async switchToNewOpenedTab(originalWindowHandle){
        console.info("Checking if the new tab is opened...");
        await this.driver.wait(
            async () => (await this.driver.getAllWindowHandles()).length === 2,
            10000
        );
        const windows = await this.driver.getAllWindowHandles();
        console.info("Switching to the new tab...")
        windows.forEach(async handle => {
            if (handle !== originalWindowHandle) {
                await this.driver.switchTo().window(handle);
            }
        });
    }

    static async swithToWindow(windowHandle){
        console.info("Switching to the window...");
        await this.driver.switchTo().window(windowHandle);
    }


    static async applyImplicitWaits(value){
        await this.driver.manage().setTimeouts({implicit: value});
    }

    static async findElement(locator){
        let element = await this.driver.wait(until.elementLocated(locator), cfg.waits.long);
        return element;
    }

    static async elementIsDisplayed(locator){
        let element = await this.driver.wait(until.elementLocated(locator), cfg.waits.long);
        await this.driver.wait(until.elementIsVisible(element), cfg.waits.long);
        let isClickable = await this.driver.wait(until.elementIsEnabled(element), cfg.waits.long);
        return await isClickable.isDisplayed();
    }

    static async findElements(locator){
        let elements = await this.driver.wait(until.elementsLocated(locator), cfg.waits.long);
        return elements;
    }

    static async goToUrl(url){
        console.info(`Making HTTP request: GET ${url}`);
        await this.driver.get(url);
    }

    static async scrollDownPage(){
        console.info('Scrolling down the page...');
        await this.driver.executeScript("window.scrollBy(0,250)", "");
    }

    static async scrollToElement(element){
        console.info('Scrolling to web element');
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element)
    }

    static async getAlert(){
        console.info("Getting alert...");
        let alert = await this.driver.switchTo().alert();
        return alert;
    }

    static async getIframe(locator){
        console.info("Getting IFrame...");
        let iframeElement = this.driver.findElement(locator); 
        let iframe = await this.driver.switchTo().frame(iframeElement);
        return iframe
    }

    static async switchToDeafult(){
        console.info("Swithing back to default content...");
        await this.driver.switchTo().defaultContent();
    }

    static async closeCurrentWindow(){
        console.info("Closing current window...");
        await this.driver.close();
    }

    static async maximizeWindow(){
        console.info("Maximizing browser window...");
        await this.driver.manage().window().maximize();
    }

    static async quit(){
        console.warn("Quiting the browser...");
        await this.driver.quit();
        this.instance = undefined;
    }
};

module.exports = {
    Browser
};
