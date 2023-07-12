// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });

// const connectDB = async () => {
//   try {
//     await connection.connect();
//     console.log("Connected to MySQL");
//     const sql = `CREATE DATABASE IF NOT EXISTS news_website;`;
//     await connection.query(sql);
//     console.log("Database Created Successfully");
//   } catch (err) {
//     console.log("Error connecting to database");
//     process.exit(0);
//   }
// };

// module.exports = { connectDB, connection };

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'news_website',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dateStrings: true,
  multipleStatements: true,
});

connection.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected to Database!');
    }
  });

module.exports = { connection };


/*
SELECT title FROM news WHERE MATCH (title, description, content) AGAINST ('mumbai' IN NATURAL LANGUAGE MODE);
SELECT * FROM news join categories on news.category_id = categories.id WHERE MATCH (news.title, news.description, news.content) AGAINST ('mumbai' IN BOOLEAN MODE);
SELECT title FROM news WHERE MATCH (title, description, content) AGAINST ('mumbai' WITH QUERY EXPANSION);

CREATE FULLTEXT INDEX fulltext_index ON news (title, description, content);
DROP INDEX fulltext_index ON news;
*/