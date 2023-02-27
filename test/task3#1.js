require('chromedriver');
require('geckodriver');
const { Browser } = require('../framework/browser/browser.js');
const { AlertUtils } = require('../framework/utils/alert-utils.js');
const { TestingUtils } = require('../framework/utils/testing-utils.js');
const { Employee } = require('./models/models.js');
const mainPage = new (require('./forms/mainPage.js')).MainPage();
const contentMenu = new (require('./forms/contentPage.js')).ContentMenuForm();
const alertForm = new (require('./forms/alertsForm.js')).AlertsForm();
const nestedFrameForm = new (require('./forms/nestedFramesForm.js')).NestedFramesForm();
const framesForm = new (require('./forms/framesForm.js')).FramesForm();
const tablesForm = new (require('./forms/webTablesForm.js')).WebTablesForm();
const regForm = new (require('./forms/registrationForm.js')).RegistrationForm();
const browserWindowsForm = new (require('./forms/browserWindowsForm.js')).BrowserWindowsForm();
const sampleWindowForm = new (require('./forms/sampleWindowForm.js')).SampleWindowForm();
const linksForm = new (require('./forms/linksForm.js')).LinksForm();
const assert = require('chai').assert;
const cfg = require('../config.json');
const testData = require('./test-data.json');


describe("Testing https://demoqa.com/", () => {    

    beforeEach(() => {
        Browser.getInstance();
        Browser.getInstance().maximizeWindow();
    });
    afterEach(() => Browser.getInstance().quit());


    it('Validation of Alerts', async () => {

        await Browser.getInstance().goToUrl(cfg.testing.url);

        assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
        
        await mainPage.navigateToAlertsFrameWindows();
        await contentMenu.goToAlerts();
        
        assert.isTrue(await alertForm.isPageOpened(), "Alert form has not appeared on page");
        
        await alertForm.clickAllert();
        let alertMessage = await AlertUtils.getMessage();
        
        assert.equal(alertMessage, testData.alerts.alertText, "Alert text is different");
        
        await AlertUtils.accept();
        
        assert.isTrue(await alertForm.isPageOpened(), "Alert hasn't been closed")
        
        await alertForm.clickConfirm();
        let confirmMessage = await AlertUtils.getMessage();
        
        assert.equal(confirmMessage, testData.alerts.confirmText, 'Confirmation text is different');
        
        await AlertUtils.accept();
        
        assert.isTrue(await alertForm.isPageOpened(), "Confirmation box hasn't been closed");
        
        let confirmResultMessage = await alertForm.getConfirmResultText(); 
        
        assert.equal(confirmResultMessage, testData.alerts.confirmResultText, "Confirm result text is different");
        
        await alertForm.clickPrompt();
        let promptMessage = await AlertUtils.getMessage();
        
        assert.equal(promptMessage, testData.alerts.promptMessage, "Prompt message is different");
        
        let randomText = TestingUtils.genRandomText(testData.alerts.lenRandomText);
        await AlertUtils.sendText(randomText);
        await AlertUtils.accept();
        
        assert.isTrue(await alertForm.isPageOpened(), "Prompt box hasn't been closed");
        
        let promptResultMessage = await alertForm.getPromptResultText();
        
        assert.equal(promptResultMessage, "You entered " + randomText, "Prompt result text is different");
    });

    it('Validation of IFrame', async () => {
        
        await Browser.getInstance().goToUrl(cfg.testing.url);
        
        assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
        
        await mainPage.navigateToAlertsFrameWindows();
        await contentMenu.goToNestedFrames();
        
        assert.isTrue(await nestedFrameForm.isPageOpened(), "Nested Frames form hasn't appeared on page");
        
        await nestedFrameForm.switchToOuterIFrame();
        let outerText = await nestedFrameForm.getBodyText();
        
        assert.equal(outerText, testData.iframes.outerFrameText, "Parrent frame message did not appear");
        
        await nestedFrameForm.switchToInnerIFrame();
        let innerText = await nestedFrameForm.getBodyText();
        await nestedFrameForm.switchToDeafultContent();
        
        assert.equal(innerText, testData.iframes.innerFrameText, "Child frame message did not appear");
        
        await contentMenu.goToFrames();
        
        assert.isTrue(await framesForm.isPageOpened(), "Frames form hasn't appeared on page");
        
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
            
            await Browser.getInstance().goToUrl(cfg.testing.url);
            
            assert.isTrue(await mainPage.isPageOpened(), "MainPage is not opened");
            
            await mainPage.navigateToElemets();
            await contentMenu.goToWebTables();
            
            assert.isTrue(await tablesForm.isPageOpened(), "Page with web tables is not opened");
            
            await tablesForm.clickOnAdd();
            
            assert.isTrue(await regForm.isPageOpened(), "Registration form is not opened");
            
            let employee = new Employee(
                firstName,
                lastName,
                age,
                email,
                salary,
                department
            );
            await regForm.createEmployee(employee);
            
            assert.isTrue(await tablesForm.isPageOpened(), "Registration form is not closed");
            
            let employees = await tablesForm.getTableRecords();
            let addedEmployeeIndex = employees.findIndex((addedEmployee) => employee.compare(addedEmployee));
            
            assert.isTrue(employee.compare(employees[addedEmployeeIndex]));
            
            await tablesForm.deleteTableRecord(addedEmployeeIndex);
            let updatedEmployees = await tablesForm.getTableRecords();
            
            assert.notEqual(employees.length, updatedEmployees.length, "Number of records doesn't change");
            assert.isFalse(updatedEmployees.some(updatedEmployee => employee.compare(updatedEmployee)), "Employee data was not deleted");
        });
    
    });    

    it('Validation of Handles', async () => {
        
        await Browser.getInstance().goToUrl(cfg.testing.url);
        
        assert.isTrue(await mainPage.isPageOpened(), "Main Page is not opened");
        
        await mainPage.navigateToAlertsFrameWindows();
        await contentMenu.goToBrowserWindows();
        
        assert.isTrue(await browserWindowsForm.isPageOpened(), "Browser Windows Form is not opened");
        
        let originalWindowHandle = await Browser.getInstance().getCurrentWindowHandle();
        await browserWindowsForm.openNewTab();
        await Browser.getInstance().switchToNewOpenedTab(originalWindowHandle);
        
        assert.isTrue(await sampleWindowForm.isPageOpened(), "Sample window form is not opened");
        
        await Browser.getInstance().closeCurrentWindow();
        await Browser.swithToWindow(originalWindowHandle);
        
        assert.isTrue(await browserWindowsForm.isPageOpened(), "Browser Windows Form is not opened");
        
        await contentMenu.goToLinks();
        
        assert.isTrue(await linksForm.isPageOpened(), "Links form is not opened");
        
        await linksForm.goToHomePage();
        originalWindowHandle = await Browser.getInstance().getCurrentWindowHandle();
        await Browser.getInstance().switchToNewOpenedTab(originalWindowHandle);        
        
        assert.isTrue(await mainPage.isPageOpened(), "Main Page is not opened");
        
        await Browser.swithToWindow(originalWindowHandle);
        
        assert.isTrue(await linksForm.isPageOpened(), "Link form is not opened");
    });
        
});
