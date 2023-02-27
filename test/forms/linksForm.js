const { BaseForm } = require('../../framework/forms/forms.js');
const { By } = require('selenium-webdriver');
const { Label } = require('../../framework/elements/label.js')


class LinksForm extends BaseForm{
    #homeLink = new Label("Home link", By.id("simpleLink"));

    constructor(){
        super("Links Form", By.xpath('//div[@class="main-header"][contains(text(), "Links")]'));
    }

    async goToHomePage(){
        await this.#homeLink.click();
    }
};

module.exports = {
    LinksForm
};
