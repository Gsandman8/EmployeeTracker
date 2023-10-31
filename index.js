const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');
const query = require('./db/queries');

const departments = function() {
    const departments = [];
};


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

const addRole = {
    type: 'input',
    name: 'addRole',
    message: 'What is the title of the role you would like to add?'
}

const addSalary = {
    type: 'input',
    name: 'addSalary',
    message: 'What is the salary of the role you would like to add?'
}

const addDepartmentId = {
    type: 'list',
    name: 'addDepartmentId',
    message: `What is the department you would to add this role to?`,
    choices: [
        
    ]
}