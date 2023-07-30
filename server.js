const express = require('express');
const inquire = require("inquirer");
const db = require('./db/connection');
const mysql = require('mysql12');

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

};

const viewAllRoles = () => {

};

const viewAllEmployees = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateEmployee = () => {

};

navigateChoices();

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});