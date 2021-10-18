const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: pdfdsfsdf
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.connect();

db.query(`SHOW TABLES`, (error, results) => {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postRouter = require("./routers/post");
app.use("/api", [likesRouter]);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
