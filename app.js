const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const cors = require("cors");

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
