const { BrowserFactory } = require('../browser/browser.js');

class AlertUtils{

    static #driver = BrowserFactory.getInstance();

    static async #getAlert(){
        let alert = await this.#driver.getAlert()
        return alert;
    }

    static async getMessage(){
        console.info("Reading text from alert...");
        let msg = await (await this.#getAlert()).getText(); 
        return msg;
    }

    static async sendText(text){
        console.info(`Sending ${text} to the alert...`)
        await (await this.#getAlert()).sendKeys(text);
    }

    static async accept(){
        console.info('Accepting the alert...')
        await (await this.#getAlert()).accept();
    }
};

module.exports = {
    AlertUtils
};