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