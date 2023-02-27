const { BaseForm } = require('../../framework/forms/forms.js');
const { Button } = require('../../framework/elements/button.js');
const { By } = require('selenium-webdriver');


class BrowserWindowsForm extends BaseForm{
    #newTabButton = new Button("New Tab Button", By.id("tabButton")); 

    constructor(){
        super("Browser Windows Form", By.xpath('//div[@class="main-header"][contains(text(), "Browser Windows")]'));
    }

    async openNewTab(){
        await this.#newTabButton.click();
    }

};

module.exports = {
    BrowserWindowsForm
};
