"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        required: true,
      },
      userId: {
        required: true,
        type: DataTypes.INTEGER,
      },
      content: {
        required: true,
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      inserdDt: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "posts",
      timestamps: false,
    }
  );
  
  posts.associate = function (models) {
    models.posts.hasMany(models.comments);
    models.posts.hasMany(models.likes);
    models.posts.belongsTo(models.users, {
      foreignKey: "userId", 
      sourceKey: 'userId'
    })
  };
  return posts;
};
