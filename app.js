const express = require("express");
const app = express()
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.EXPRESS_PORT;
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mysql = require('mysql');
const db = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
db.connect();

db.query(`SHOW TABLES`, (error, results) => {
  if (error) {
    console.log(error);
  }
  console.log(results);
});





const Router = require("./routers/index");
app.use("/api", [Router]);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
