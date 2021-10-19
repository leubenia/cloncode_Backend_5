"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likes.init(
    {
      likeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      postId: {
        required: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        required: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );

  likes.associate = function (models) {
    models.likes.hasMany(models.posts, {
      foreignKey: "postId",
      onDelete: "cascade",
    });
    models.likes.hasMany(models.users, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };
  return likes;
};
