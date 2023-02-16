require('chromedriver');
require('geckodriver');
const mainPage = new (require('./forms/mainPage.js')).MainPage();
const contentPage = new (require('./forms/contentPage.js')).ContentPage();
const alertForm = new (require('./forms/alertsForm.js')).AlertsForm();
const assert = require('chai').assert;
const cfg = require('../config.json');
const testData = require('./test-data.json');
const { BrowserFactory } = require('../framework/browser/browser.js');
const { AlertUtils } = require('../framework/utils/alert-utils.js');
const { TestingUtils } = require('../framework/utils/testing-utils.js');


describe("Testing https://demoqa.com/", () => {    

    beforeEach(() => BrowserFactory.getInstance().initDriver(cfg.browser.chrome.name));
    afterEach(() => BrowserFactory.getInstance().quit());


    it('Validation of Alerts', async ()=> {

        // navigate to MainPage
        await BrowserFactory.getInstance().goToUrl(cfg.testing.url);
        // assert if MainPage is opened
        assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
        // click on Alerts, Frame & Windows button
        await mainPage.navigateToAlertsFrameWindows();
        // in a menu clock Alerts button
        await contentPage.goToAlerts();
        // allerts form has appeared on page
        assert.isTrue(await alertForm.isPageOpened(), "Alert form has not appeared on page");
        // Click on allert button
        await alertForm.clickAllert();
        // allert with text is opened
        let alertMessage = await AlertUtils.getMessage();
        assert.equal(alertMessage, testData.alerts.alertText, "Alert text is different");
        // click ok button
        await AlertUtils.accept();
        // allert has closed
        assert.isTrue(await alertForm.isPageOpened(), "Alert hasn't been closed")
        // click on confirm 
        await alertForm.clickConfirm();
        // allert with text is open "Do you confirm action?"
        let confirmMessage = await AlertUtils.getMessage();
        assert.equal(confirmMessage, testData.alerts.confirmText, 'Confirmation text is different');
        //click ok
        await AlertUtils.accept();
        //alert has closed
        assert.isTrue(await alertForm.isPageOpened(), "Confirmation box hasn't been closed");
        //Text "You selected OK" has appeared on page
        let confirmResultMessage = await alertForm.getConfirmResultText(); 
        assert.equal(confirmResultMessage, testData.alerts.confirmResultText, "Confirm result text is different");
        // click on prompt
        await alertForm.clickPrompt();
        // alert with text "Please enter your name" is open
        let promptMessage = await AlertUtils.getMessage();
        assert.equal(promptMessage, testData.alerts.promptMessage, "Prompt message is different");
        // enter randomlygenerated text
        let randomText = TestingUtils.genRandomText(testData.alerts.lenRandomText);
        await AlertUtils.sendText(randomText);
        // click ok
        await AlertUtils.accept();
        // alert is closed
        assert.isTrue(await alertForm.isPageOpened(), "Prompt box hasn't been closed");
        // appeared text equals to the one you've entered
        let promptResultMessage = await alertForm.getPromptResultText();
        assert.equal(promptResultMessage, "You entered " + randomText, "Prompt result text is different");
    });
    
});

