const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) throw err;
});

module.exports = db;