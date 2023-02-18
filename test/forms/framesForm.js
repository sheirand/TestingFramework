const { BaseForm } = require('../../framework/forms/forms.js');
const { IFrame, Label } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');
const { BrowserFactory } = require('../../framework/browser/browser.js');

class FramesForm extends BaseForm{
    upperFrame = new IFrame("Upper Frame", By.id('frame1'));
    lowerFrame = new IFrame("Lower Frame", By.id('frame2'));
    headingText = new  Label("Heading Text", By.xpath('//h1[@id="sampleHeading"]'));
    #driver = BrowserFactory.getInstance();

    constructor(){
        super("Frames Form", By.xpath('//div[@class="main-header"][contains(text(), "Frames")]'));
    }

    async switchToUpperFrame(){
        await this.#driver.getIframe(await this.upperFrame.getElement());
    }

    async switchToLowerFrame(){
        await this.#driver.getIframe(await this.lowerFrame.getElement());
    }

    async getText(){
        return await this.headingText.getText();
    }    

    async switchToDeafultContent(){
        await this.#driver.switchToDeafult();
    }
    
};

module.exports = {
    FramesForm
};
