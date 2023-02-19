const { TestingUtils } = require('../../framework/utils/testing-utils.js');

class Employee{
    
    constructor(firstName, lastName, age, email, salary, department){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.salary = salary;
        this.department = department;
    };

    compare(employee){
        return TestingUtils.objectsEquality(this, employee);
        }
};

module.exports = {
    Employee
};
