const { BaseForm } = require('../../framework/forms/forms.js');
const { Button } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');


class MainPage extends BaseForm{
    
    #elementsButton = new Button('Elements', By.xpath('//div[@class="card-body"]//h5[contains(text(), "Elements")]'))


    constructor(){
        console.log("blabla")
        super("MainPage", By.className("home-content"));
    }

    navigateToElemets(){
        this.#elementsButton.click();
    }


};

module.exports = {
    MainPage
};
