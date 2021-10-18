"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comments.init(
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        required: true,
      },
      comment: {
        type: DataTypes.STRING,
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
      modelName: "comments",
    }
  );

  comments.associate = function (models) {
    models.comments.hasMany(models.posts, {
      foreignKey: "postId",
      onDelete: "cascade",
    });
    models.comments.hasMany(models.users, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  };
  return comments;
};