const express = require('express');
const inquire = require("inquirer");
const db = require('./db/connection');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(( req, res ) => {
    res.status(404).end();
});

const navigateChoices = () => {
    inquirer.promopt({
        type: 'list',
        name: 'navigate',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Exmployees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role'],
    }).then(answer => {
        switch (answer.navigate) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            
            case 'View All Roles':
                viewAllRoles();
                break;
            
            case 'View All Employees':
                viewAllEmployees();
                break;
            
            case 'Add A Department':
                addADepartment();
                break;

            case 'Add A Role':
                addARole();
                break;

            case 'Add Am Employee':
                addAnmEmployee();
                break;
            
            case 'Update An Employee Role':
                updateAnEmployeeRole();
                break;
        }
    })
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const viewAllRoles = () => {
    db.query('SELECT * FROM role;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const viewAllEmployees = () => {
    db.query('SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', function (err, results) {
        console.table(results);
        navigateChoices();
    });
}

const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "newDepartment",
        message: "What is the name of your new Department?"
    });
}

const addRole = () => {
    inquirer.prompt([{
        type: "input",
        name: "jobTitle",
        message: "What is your new job title?"
    },
    {
        type: "number",
        name: "salary",
        message: "What is the pay of this new position?"
    },
    {
        type: "number",
        name: "departmentID",
        message: "What is the Department ID associated with this new position?"
    }
    ]).then((answer) => {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.jobTitle, answer.salary, answer.department_ID], (err, results) => {
            db.query("SELECT * FROM role", (err, results) => {
            console.table(results);
            navigateChoices();
            })
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([{
        type: "input",
        name: "fistName",
        message: "What is your new employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is your new employees last name?"
    },
    {
        type: "number",
        name: "manager",
        message: "What is the ID of the manager that the new employee reports to?"
    },
    ]).then((answer) => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], (err, results) => {
            db.query("SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;", (err, results) => {
                console.table(results);
                navigateChoices();
            })
        })
    })
};

const updateAnEmployeeRole = () => {
    inquirer.prompt([{
        type: "number",
        name: "employeeID",
        message: "What is the ID number of the employee you're updating?"
    },
    {
        type: "number",
        name: "roleID",
        message: "What is the ID of the role you want to update the employee to?"
    }
    ]).then((answer) => {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.roleID, answer.employeeID], (err, results) => {
            db.query("SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;", (err, results) => {
                console.table(results);
                navigateChoices();
            })
        })
    })
};

navigateChoices();

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});