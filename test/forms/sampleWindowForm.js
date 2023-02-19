const { BaseForm } = require('../../framework/forms/forms.js');
const { By } = require('selenium-webdriver');


class SampleWindowForm extends BaseForm{

    constructor(){
        super("Sample Window Form", By.id('sampleHeading'));
    }
};

module.exports = {
    SampleWindowForm
};
