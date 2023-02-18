const { BaseForm } = require('../../framework/forms/forms.js');
const { Button } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');


class ContentPage extends BaseForm{
    #elementsButton = new Button(
        "Elements",
        By.xpath('//div[@class="element-group"]//div[contains(text(), "Elements")]')
        );
    #AlertsFrameWondowsButton = new Button(
        "Alerts, Frame & Windows",
        By.xpath('//div[@class="element-group"]//div[contains(text(), "Alerts, Frame & Windows")]')
        );
    #alertsButton = new Button("Alerts", By.xpath('//span[contains(text(), "Alerts")]'));
    #framesButton = new Button("Frames", By.xpath('//span[contains(text(), "Frames")]'));
    #nestedFramesButton = new Button("Nested Frames", By.xpath('//span[contains(text(), "Nested Frames")]'));
    #webTablesButton = new Button("Web Tables", By.xpath('//span[contains(text(), "Web Tables")]'));
    #browserWindowsButton = new Button("Browser Windows", By.xpath('//span[contains(text(), "Browser Windows")]'));
    #linksButton = new Button("Links", By.xpath('//span[contains(text(), "Links")]'));

    constructor(){
        super("ContentPage", By.className("left-panel"));
    }

    async goToAlerts(){
        await this.#alertsButton.click();
    }
    
    async goToNestedFrames(){
        await this.#nestedFramesButton.click();
    }

    async goToFrames(){
        await this.#framesButton.click();
    }

    async goToWebTables(){
        await this.#webTablesButton.click();
    }
    
};

module.exports = {
    ContentPage
};
