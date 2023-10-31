const mysql = require('mysql2');

const connection = mysql.createConnection({ 
    host: 'localhost',
    database: 'company_db', 
    user: 'root',
    password: 'password'
});

module.exports = connection;