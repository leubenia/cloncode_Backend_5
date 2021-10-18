const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Router = require("./routers/post");
app.use("/api", [Router]);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
askdjaksljdsklajdsklajdkslajdklasjd
asdklasjdklasjdl

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
