const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.EXPRESS_PORT;
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Router = require("./routers");
app.use("/api", [Router]);

const { sequelize, Sequelize } = require('./models');

const driver = async () => {
  try {
      await sequelize.sync();
  } catch (err) {
      console.error('초기화 실패');
      console.error(err);
      return;
  }

  console.log('초기화 완료.');
};
driver();

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});