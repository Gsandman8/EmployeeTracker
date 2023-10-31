USE company_db;

INSERT INTO department (name)
ADD VALUES ("Sales"),
           ("Marketing"),
           ("Research"),
           ("Finance"),
           ("Legal");

INSERT INTO role (title, salary, department_id)
ADD VALUES ("Sales Lead", 100000, 1),
           ("Sales Associate", 80000, 1),
           ("Account Manager", 130000, 1),
           ("Marketing Manager", 150000, 2),
           ("Market Analyst", 120000, 2),
           ("Product Manager", 150000, 3)
           ("Prouct Developer", 120000, 3),
           ("Accountant", 125000, 4),
           ("Legal Team Lead", 180000, 5),
           ("Lawyer", 150000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
ADD VALUES ("John", "Doe", 1, NULL),
           ("Dave", "Chesterfield", 2, 1),
           ("Susan", "White", 2, 1),
           ("Jane", "Doe", 2, 1),
           ("Mike", "Smith", 3, NULL),
           ("Sally", "Jones", 4, NULL),
           ("Bill", "Johnson", 5, 6),
           ("Mary", "Williams", 6, NULL),
           ("Tom", "Brown", 7, 8),
           ("Jerry", "Cobb", 7, 8)
           ("Jack", "Davis", 8, NULL),
           ("Jill", "Miller", 9, NULL),
           ("Sam", "Wilson", 10, 12);
