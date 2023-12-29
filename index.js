async function main(){
    const inquirer = require('inquirer');
    const mysql = require('mysql2/promise');
    const db = require('./config/connection');
    const Calls = require('./controllers/queries');
    const Query = new Calls(); 

    const con = await mysql.createConnection({
        host: 'localhost',
        database: 'company_db', 
        user: 'root',
        password: 'password'
        }); 
    
    async function getDepartments(){
        const [rows, fields] = await con.execute(Query.getDepartments());
        return rows;
    }
    const departments = await getDepartments();
    const departmentList = departments.map(department => department.name);

    async function getRoles(){ 
        const [rows, fields] = await con.execute(Query.getRoles());
        return rows;
    }
    const roles = await getRoles();
    const rolesList = roles.map(role => role.title);

    async function getRolesData(){
        const [rows, fields] = await con.execute(Query.getRolesData());
        return rows;
    }
    const rolesData = await getRolesData();

    async function getEmployees(){
        const [rows, fields] = await con.execute(Query.getEmployees());
        return rows;
    }
    const employees = await getEmployees();
    const employeesList = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

    async function getEmployeesData(){
        const [rows, fields] = await con.execute(Query.getEmployeesData());
        return rows;
    }
    const employeesData = await getEmployeesData();

    async function getManagers(){
        const [rows, fields] = await con.execute(Query.getManagers());
        return rows;
    }
    const managers = await getManagers();
    const managersList = managers.map(manager => `${manager.first_name} ${manager.last_name}`);



    const mainMenu = {
        type: 'list',
        name: 'mainMenu',
        message: 'Welcome to the Employee Tracker! What would you like to do?',
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

    const navigate = {
        type: 'list',
        name: 'navigate',
        message: 'Would you like to return to the main menu?',
        choices: ['Yes', 'No']
    }


    inquirer.prompt(mainMenu).then((res) => {
        if(res.mainMenu === 'View All Departments'){
            console.table([...departments]);
            inquirer.prompt(navigate).then((res) => {
                if(res.navigate === 'Yes'){
                    main();
                } else {
                    process.exit();
                }
            });
        } else if(res.mainMenu === 'View All Roles'){
            console.table([...rolesData]);
            inquirer.prompt(navigate).then((res) => {
                if(res.navigate === 'Yes'){
                    main();
                } else {
                    process.exit();
                }
            });
        } else if(res.mainMenu === 'View All Employees'){
            console.table([...employeesData]);
            inquirer.prompt(navigate).then((res) => {
                if(res.navigate === 'Yes'){
                    main();
                } else {
                    process.exit();
                }
            });
        } else if(res.mainMenu === 'Add a Department'){
            inquirer.prompt(addDepartment).then((res) => {
                con.execute(Query.addDepartment(res.addDepartment));
                inquirer.prompt(navigate).then((res) => {
                    if(res.navigate === 'Yes'){
                        main();
                    } else {
                        process.exit();
                    }
                });
            });
        } else if(res.mainMenu === 'Add a Role'){
            inquirer.prompt(addRole).then((res) => {
                const departmentId = departments.find(department => department.name === res.addDepartmentId).id;
                con.execute(Query.addRole(res.addRole, res.addSalary, departmentId));
                inquirer.prompt(navigate).then((res) => {
                    if(res.navigate === 'Yes'){
                        main();
                    } else {
                        process.exit();
                    }
                });
            });
        } else if(res.mainMenu === 'Add an Employee'){
            inquirer.prompt(addEmployee).then((res) => {
                const roleId = roles.find(role => role.title === res.role).id;
                if(res.manager === "No Manager"){
                    const manager_id = null; 
                    con.execute(Query.addEmployee(res.firstName, res.lastName, roleId, manager_id));
                } else {const managerId = managers.find(manager => `${manager.first_name} ${manager.last_name}` === res.manager).id;
                con.execute(Query.addEmployee(res.firstName, res.lastName, roleId, managerId));
                }
                inquirer.prompt(navigate).then((res) => {
                    if(res.navigate === 'Yes'){
                        main();
                    } else {
                        process.exit();
                    }
                });
            });
        } else if(res.mainMenu === 'Update an Employee Role'){
            inquirer.prompt(UpdateEmployeeRole).then((res) => {
                const employeeId = employees.find(employee => `${employee.first_name} ${employee.last_name}` === res.employee).id;
                const roleId = roles.find(role => role.title === res.newRole).id;
                con.execute(Query.UpdateEmployeeRole(roleId, employeeId));
                inquirer.prompt(navigate).then((res) => {
                    if(res.navigate === 'Yes'){
                        main();
                    } else {
                        process.exit();
                    }
                });
            });
        } else if(res.mainMenu === 'Exit'){
            process.exit();
        }
    });
}


main();