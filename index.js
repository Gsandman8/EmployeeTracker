const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');


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
