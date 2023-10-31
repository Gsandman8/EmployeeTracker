const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');
const Calls = require('./controllers/queries');
const Query = new Calls(); 

const departments = function() {
    const departments = [];
    db.query(Query.getDepartments(), (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(department => {
            departments.push(department.name);
        });
    });
    return departments;
};
const departmentList = departments();

const roles = function() {
    const roles = [];
    db.query(Query.getRoles(), (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(role => {
            roles.push(role.title);
        });
    });
    return roles;
}
const rolesList = roles();

const employees = function() {
    const employees = [];
    db.query(Query.getEmployees(), (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(employee => {
            employees.push(employee.first_name + " " + employee.last_name);
        });
    });
    return employees;
}
const employeesList = employees();

const managers = function() { 
    const managers = [];
    db.query(Query.getManagers(), (err, res) => {
        if (err) {
            console.log(err);
        }
        res.forEach(manager => {
            managers.push(manager.first_name + " " + manager.last_name);
        });
    });
    return managers;
}
const managersList = managers();

const mainMenu = {
    type: 'list',
    name: 'mainMenu',
    message: 'What would you like to do?',
    choices: ['View All Departments',
     'View All Roles', 
     'View All Employees', 
     'Add a Department', 
     'Add a Role', 
     'Add an Employee', 
     'Update an Employee Role', 
     'Exit']
};

const addDepartment = {
    type: 'input',
    name: 'addDepartment',
    message: 'What is the name of the department you would like to add?'
};

const addRole = [
    {
        type: 'input',
        name: 'addRole',
        message: 'What is the title of the role you would like to add?'
    },
    {
        type: 'input',
        name: 'addSalary',
        message: 'What is the salary of the role you would like to add?'
    },
    {
        type: 'list',
        name: 'addDepartmentId',
        message: `What is the department you would to add this role to?`,
        choices: [...departmentList]
    }
];

const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: `What is the employee's first name?`
    },
    {
        type: 'input',
        name: 'lastName',
        message: `What is the employee's last name?`
    },
    {
        type: 'list',
        name: 'role',
        message: `What is the employee's role?`,
        choices: [...rolesList]
    },
    {
        type: 'list',
        name: 'manager',
        message: `Who is the employee's manager?`,
        choices: [...managersList, "No Manager"]
    }
];

const UpdateEmployeeRole = [
    {
        type: 'list',
        name: 'employee',
        message: `Which employee would you like to update?`,
        choices: [...employeesList]
    },
    {
        type: 'list',
        name: 'newRole',
        message: `What is the employee's new role?`,
        choices: [...rolesList]
    }
];