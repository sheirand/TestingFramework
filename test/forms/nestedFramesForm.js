const { BaseForm } = require('../../framework/forms/forms.js');
const { Label } = require('../../framework/elements/label.js');
const { By } = require('selenium-webdriver');
const { Browser } = require('../../framework/browser/browser.js');

class NestedFramesForm extends BaseForm{
    #outerFrameLocator = By.id("frame1");
    #innerFrameLocator = By.xpath('//iframe[contains(@srcdoc, "Child")]');
    #bodyText = new Label("Body Text", By.xpath("//html//body"));
    #driver = Browser.getInstance();

    constructor(){
        super("Nested Frames Form", By.xpath('//div[@class="main-header"][contains(text(), "Nested Frames")]'));
    }

    async switchToOuterIFrame(){
        await this.#driver.getIframe(this.#outerFrameLocator);
    }

    async switchToInnerIFrame(){
        await this.#driver.getIframe(this.#innerFrameLocator);
    }

    async getBodyText(){
        return await this.#bodyText.getText();
    }    

    async switchToDeafultContent(){
        await this.#driver.switchToDeafult();
    }

};

module.exports = {
    NestedFramesForm
};
