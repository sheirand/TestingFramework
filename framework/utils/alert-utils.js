const { BrowserFactory } = require('../browser/browser.js');

class AlertUtils{

    static #driver = BrowserFactory.getInstance();

    static async #getAlert(){
        let alert = await this.#driver.getAlert()
        return alert;
    }

    static async getMessage(){
        let msg = await (await this.#getAlert()).getText(); 
        return msg;
    }

    static async sendText(text){
        await (await this.#getAlert()).sendKeys(text);
    }

    static async accept(){
        await (await this.#getAlert()).accept();
    }
};

module.exports = {
    AlertUtils
};