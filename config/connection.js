

module.exports = 
async function main(){
const mysql = require('mysql2/promise')();
const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'company_db', 
    user: 'root',
    password: 'password'
}); 
};