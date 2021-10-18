"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("likes", {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "postId",
        },
        onDelete: "cascade",
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("likes");
  },
};
