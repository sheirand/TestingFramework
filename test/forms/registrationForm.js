const { BaseForm } = require('../../framework/forms/forms.js');
const { Button, TextField } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');

class RegistrationForm extends BaseForm{
    #submitButton = new Button("Submit button", By.id('submit'));
    #firstNameField = new TextField("First name field", By.id('firstName'));
    #lastNameField = new TextField("Last name field", By.id('lastName'));
    #ageField = new TextField("Age field", By.id('age'));
    #emailField = new TextField("Email field", By.id('userEmail'));
    #salaryField = new TextField("Salary field", By.id('salary'));
    #departmentField = new TextField("Department field", By.id('department'));
    
    constructor(){
        super("Registration Form", By.id('registration-form-modal'));
    }

    async createEmployee({firstName, lastName, age, email, salary, department}){
        await this.#firstNameField.sendKeys(firstName);
        await this.#lastNameField.sendKeys(lastName);
        await this.#emailField.sendKeys(email);
        await this.#ageField.sendKeys(age);
        await this.#salaryField.sendKeys(salary);
        await this.#departmentField.sendKeys(department);
        await this.#submitButton.click();
    }
};

module.exports = {
    RegistrationForm
};
