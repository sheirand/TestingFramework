const { Builder } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const Firefox = require('selenium-webdriver/firefox');

class BrowserFactory{
    
    static initDriver(browser, args){
        console.warn(`Initializing ${browser} driver...`)
        switch(browser){
            case "chrome": {
                this.options = new Chrome.Options();
                if (args) this.options = this.options.addArguments(args);
                this.driver = new Builder()
                .forBrowser(browser).setChromeOptions(this.options)
                .build();
                break;
            };
            case "firefox": {
                this.options = new Firefox.Options();
                if (args) this.options = this.options.addArguments(args);
                 this.driver = new Builder()
                 .forBrowser(browser).setFirefoxOptions(this.options)
                 .build();
                 break;
            };
            default:
                throw new Error("Incorrect Browsername!");
        };
        return this.driver;   
    }
};

module.exports = {
    BrowserFactory
};
