const mainPage = new (require('./forms/mainPage.js')).MainPage();
const assert = require('chai').assert;
const cfg = require('../config.json');
const { BrowserFactory } = require('../framework/browser/browser.js');


describe("Testing https://demoqa.com/", () => {    

    beforeEach(() => BrowserFactory.getInstance().initDriver(cfg.browser.chrome.name));
    afterEach(() => BrowserFactory.getInstance().quit());


    it('Validation of Alerts', async ()=> {

        assert.isTrue(true, "not true");
    });

    it('Validation of Something', async ()=> {

        assert.isTrue(true, "not true");
    });
    
});

