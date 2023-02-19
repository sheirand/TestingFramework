const { BaseForm } = require('../../framework/forms/forms.js');
const { Button, WebTable } = require('../../framework/elements/elements.js');
const { By } = require('selenium-webdriver');
const { Employee } = require('../models/models.js');
const testData = require('../test-data.json');

class WebTablesForm extends BaseForm{
    #addButton = new Button("Add button", By.id('addNewRecordButton'));
    #table = new WebTable("Employees Table", By.xpath('//div[contains(@class, "rt-table")]'))
    
    constructor(){
        super("Web Tables Form", By.xpath('//div[@class="main-header"][contains(text(), "Web Tables")]'));
    }

    async clickOnAdd(){
        await this.#addButton.click();
    }

    async getTableRecords(){
        let records = [];
        let rowIndex = 0; 
        while ((await this.#table.getContent(rowIndex, testData.indexes.firstName))?.trim()){
            let firstName = await this.#table.getContent(rowIndex, testData.indexes.firstName);
            let lastName = await this.#table.getContent(rowIndex, testData.indexes.lastName);
            let age = await this.#table.getContent(rowIndex, testData.indexes.age);
            let email = await this.#table.getContent(rowIndex, testData.indexes.email);
            let salary = await this.#table.getContent(rowIndex, testData.indexes.salary);
            let department = await this.#table.getContent(rowIndex, testData.indexes.department);
            records.push(new Employee(firstName, lastName, age, email, salary, department));
            rowIndex++;
        };
        return records; 
    }

    async deleteTableRecord(index){
        let deleteButton = new Button("Delete button", By.id(`delete-record-${index+1}`));
        await deleteButton.click();
    }

};

module.exports = {
    WebTablesForm
};
