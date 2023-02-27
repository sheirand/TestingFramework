const { BaseElement } = require('./base-element.js');

class TextField extends BaseElement{
    
    async sendKeys(keys){
        console.info(`Sending ${keys} to the ${this.name}...`);
        (await this.getElement()).sendKeys(keys);
    }

};

module.exports = {
    TextField
};
