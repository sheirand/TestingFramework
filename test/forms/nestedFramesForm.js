const { BaseForm } = require('../../framework/forms/forms.js');
const { IFrame, TextField } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');
const { BrowserFactory } = require('../../framework/browser/browser.js');

class NestedFramesForm extends BaseForm{
    outerFrame = new IFrame("Outer Frame", By.id("frame1"));
    innerFrame = new IFrame("Innter Frame", By.xpath('//iframe[contains(@srcdoc, "Child")]'));
    bodyText = new  TextField("Body Text", By.xpath("//html//body"));
    #driver = BrowserFactory.getInstance();

    constructor(){
        super("Nested Frames Form", By.xpath('//div[@class="main-header"][contains(text(), "Nested Frames")]'));
    }

    async switchToOuterIFrame(){
        await this.#driver.getIframe(await this.outerFrame.getElement());
    }

    async switchToInnerIFrame(){
        await this.#driver.getIframe(await this.innerFrame.getElement());
    }

    async getBodyText(){
        return await this.bodyText.getText()
    }    

    async switchToDeafultContent(){
        await this.#driver.switchToDeafult();
    }
    
};

module.exports = {
    NestedFramesForm
};
