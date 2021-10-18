const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.EXPRESS_PORT;
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Router = require("./routers/index");
app.use("/api", [Router]);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});