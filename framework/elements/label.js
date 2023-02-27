const { BaseElement } = require('./base-element.js');

class Label extends BaseElement{
    
    async getText(){
        console.info(`Getting text from ${this.name} label...`);
        let text = await (await this.getElement()).getText();
        return text
    }
};

module.exports = {
    Label
};
