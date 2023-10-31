class Calls{
    getDepartmentsArray(){
        return `SELECT name FROM department WHERE id = ${id}`;
    }
    getDepartments(){
        return "SELECT * FROM departments";
    }

    getRoles(){
        return "SELECT * FROM roles LEFT JOIN departments ON roles.department_id = departments.id";
    }

    getEmployees(){
        return "SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";
    }

    addDepartment(name){     
        return `INSERT INTO departments (name) VALUES ('${name}')`;
    }

    addRole(title, salary, department_id){
        return `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`;
    }

    addEmployee(first_name, last_name, role_id, manager_id){
        return `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
    }

    UpdateEmployeeRole(role_id, employee_id){
        return `UPDATE employees SET role_id = ${role_id} WHERE id = ${employee_id}`;
    }
}

module.exports = Calls();