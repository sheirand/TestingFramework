const { BaseForm } = require('../../framework/forms/forms.js');
const { Button } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');


class MainPage extends BaseForm{
    
    #elementsButton = new Button('Elements', By.xpath('//div[@class="card-body"]//h5[contains(text(), "Elements")]'))
    #alertsFrameWindowsButton = new Button("Alerts, Frame & Windows", By.xpath('//div[@class="card-body"]//h5[contains(text(), "Alerts, Frame & Windows")]'))

    constructor(){
        super("MainPage", By.className("home-content"));
    }

    async navigateToElemets(){
        await this.#elementsButton.click();
    }

    async navigateToAlertsFrameWindows(){
        await this.#alertsFrameWindowsButton.click();
    }
};

module.exports = {
    MainPage
};
