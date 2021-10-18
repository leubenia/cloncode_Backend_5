"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
        onDelete: "cascade",
      },
      content: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      insertDt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  },
};
