const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_db"
    },
    console.log("You are connected to the employee DB!")
);

module.exports = db;