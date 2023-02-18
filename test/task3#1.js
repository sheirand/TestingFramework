require('chromedriver');
require('geckodriver');
const { BrowserFactory } = require('../framework/browser/browser.js');
const { AlertUtils } = require('../framework/utils/alert-utils.js');
const { TestingUtils } = require('../framework/utils/testing-utils.js');
const { Employee } = require('./models/models.js');
const mainPage = new (require('./forms/mainPage.js')).MainPage();
const contentPage = new (require('./forms/contentPage.js')).ContentPage();
const alertForm = new (require('./forms/alertsForm.js')).AlertsForm();
const nestedFrameForm = new (require('./forms/nestedFramesForm.js')).NestedFramesForm();
const framesForm = new (require('./forms/framesForm.js')).FramesForm();
const tablesForm = new (require('./forms/webTablesForm.js')).WebTablesForm();
const regForm = new (require('./forms/registrationForm.js')).RegistrationForm();
const assert = require('chai').assert;
const cfg = require('../config.json');
const testData = require('./test-data.json');

describe("Testing https://demoqa.com/", () => {    

    beforeEach(() => BrowserFactory.getInstance().initDriver(cfg.browser.chrome.name));
    afterEach(() => BrowserFactory.getInstance().quit());


    it('Validation of Alerts', async () => {

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

    it('Validation of IFrame', async () => {
        //navigate to mainpage
        await BrowserFactory.getInstance().goToUrl(cfg.testing.url);
        //mainpage is open
        assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
        //click alerts frame windows
        await mainPage.navigateToAlertsFrameWindows();
        //click nested frames
        await contentPage.goToNestedFrames();
        //page with nested frames form is open
        assert.isTrue(await nestedFrameForm.isPageOpened(), "Nested Frames form hasn't appeared on page");
        // there are messages Parent frame Child iframe
        await nestedFrameForm.switchToOuterIFrame();
        let outerText = await nestedFrameForm.getBodyText();
        assert.equal(outerText, testData.iframes.outerFrameText, "Parrent frame message did not appear");
        await nestedFrameForm.switchToInnerIFrame();
        let innerText = await nestedFrameForm.getBodyText();
        await nestedFrameForm.switchToDeafultContent();
        assert.equal(innerText, testData.iframes.innerFrameText, "Child frame message did not appear");
        // select frames option in a left menu
        await contentPage.goToFrames();
        // page with frames is open
        assert.isTrue(await framesForm.isPageOpened(), "Frames form hasn't appeared on page");
        // message from uppe frame is eqaul to the message from lower frame
        await framesForm.switchToUpperFrame();
        let upperText = await framesForm.getText();
        await framesForm.switchToDeafultContent();
        await framesForm.switchToLowerFrame();
        let lowerText = await framesForm.getText();
        await framesForm.switchToDeafultContent();
        assert.equal(upperText, lowerText, "The text is different in lower and upper frames");
    });

    const jsonEmployees = testData.tables.registrationData;
    jsonEmployees.forEach(({firstName, lastName, age, email, salary, department}) => {
        it(`Validation of Tables for employee: ${firstName} ${lastName}`, async () => {
            //navigate to main page
            await BrowserFactory.getInstance().goToUrl(cfg.testing.url);
            // main page is open
            assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
            // click on elements
            await mainPage.navigateToElemets();
            // click on web table
            await contentPage.goToWebTables();
            // page with web tables is open
            assert.isTrue(await tablesForm.isPageOpened(), "Page with web tables is not opened");
            // click on add
            await tablesForm.clickOnAdd();
            // registration form has appeared 
            assert.isTrue(await regForm.isPageOpened(), "Registration form is not opened");
            // enter data and click submit
            let employee = new Employee(
                firstName,
                lastName,
                age,
                email,
                salary,
                department
            );
            await regForm.createEmployee(employee);
            // registration form has closed
            assert.isTrue(await tablesForm.isPageOpened(), "Registration form is not closed");
            // data of user has appeared in a table
            let employees = await tablesForm.getTableRecords();
            let addedEmployeeIndex = employees.findIndex((addedEmployee) => employee.compare(addedEmployee));
            assert.isTrue(employee.compare(employees[addedEmployeeIndex]));
            // click delete button in a row of added data
            await tablesForm.deleteTableRecord(addedEmployeeIndex);
            // number of reconrds in table has changed
            let updatedEmployees = await tablesForm.getTableRecords();
            assert.notEqual(employees.length, updatedEmployees.length, "Number of records doesn't change");
            // data has been deleted
            assert.isFalse(updatedEmployees.some(updatedEmployee => employee.compare(updatedEmployee)), "Employee data was not deleted");
        });
    
    });    
        
});

