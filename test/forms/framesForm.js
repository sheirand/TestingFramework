const { BaseForm } = require('../../framework/forms/forms.js');
const { Label } = require('../../framework/elements/label.js');
const { By } = require('selenium-webdriver');
const { Browser } = require('../../framework/browser/browser.js');

class FramesForm extends BaseForm{
    #upperFrameLocator = By.id('frame1');
    #lowerFrameLocator = By.id('frame2');
    #headingText = new Label("Heading Text", By.xpath('//h1[@id="sampleHeading"]'));
    #driver = Browser.getInstance();

    constructor(){
        super("Frames Form", By.xpath('//div[@class="main-header"][contains(text(), "Frames")]'));
    }

    async switchToUpperFrame(){
        await this.#driver.getIframe(this.#upperFrameLocator);
    }

    async switchToLowerFrame(){
        await this.#driver.getIframe(this.#lowerFrameLocator);
    }

    async getText(){
        return await this.#headingText.getText();
    }    

    async switchToDeafultContent(){
        await this.#driver.switchToDeafult();
    }
    
};

module.exports = {
    FramesForm
};
