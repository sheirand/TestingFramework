const { BaseForm } = require('../../framework/forms/forms.js');
const { Button, TextField } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');


class AlertsForm extends BaseForm{
    #alertButton = new Button("Alert", By.id("alertButton"));
    #alertWithDelayButton = new Button("Alert with Delay", By.id("timerAlertButton"));
    #confirmButton = new Button("Confirm", By.id("confirmButton"));
    #promptButton = new Button("Prompt", By.id("promtButton"));
    #confirmText = new TextField("Confirm Text", By.id("confirmResult"));
    #promptText = new TextField("Prompt Text", By.id("promptResult"));

    constructor(){
        super("Allerts Form", By.xpath('//div[@class="main-header"][contains(text(), "Alerts")]'));
    }

    async clickAllert(){
        await this.#alertButton.click();
    }
    
    async clickAllertWithDelay(){
        await this.#alertWithDelayButton.click();
    }
    
    async clickConfirm(){
        await this.#confirmButton.click();
    }

    async clickPrompt(){
        await this.#promptButton.click();
    }
    
    async getConfirmResultText(){
        let text = await this.#confirmText.getText();
        return text
    }

    async getPromptResultText(){
        let text = await this.#promptText.getText();
        return text
    }
    
};

module.exports = {
    AlertsForm
};
