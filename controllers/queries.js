class Calls{
    getDepartments(){
        return "SELECT * FROM department";
    }

    getRolesData(){
        return "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id";
    }

    getRoles(){
        return "SELECT * FROM role";
    }

    getEmployeesData(){
        return "SELECT employee.id AS employeeId, employee.*, role.*, department.* FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id";
    }

    getEmployees(){
        return "SELECT * FROM employee";
    }

    getManagers(){
        return "SELECT * FROM employee WHERE manager_id IS NULL";
    }

    addDepartment(name){     
        return `INSERT INTO department (name) VALUES ('${name}')`;
    }

    addRole(title, salary, department_id){
        return `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`;
    }

    addEmployee(first_name, last_name, role_id, manager_id){
        return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
    }

    UpdateEmployeeRole(role_id, employee_id){
        return `UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id}`;
    }
}

module.exports = Calls;