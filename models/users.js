"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        required: true,
      },
      userName: {
        type: DataTypes.STRING,
        require: true,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
      },
      profile: {
        type: DataTypes.STRING,
        require: true,
      },
      pw: {
        type: DataTypes.STRING,
        require: true,
      },
      birthday: {
        type: DataTypes.STRING,
        require: true,
      },
      gender: {
        type: DataTypes.STRING,
        require: true,
      },
      salt: {
        type: DataTypes.STRING,
        require: true,
      },
    },

    {
      sequelize,
      modelName: "users",
      timestamps: false,
    }
  );
  users.associate = function (models) {
    models.users.hasMany(models.posts ,{
      foreignKey: "userId", sourceKey: 'userId'
    });
    models.users.hasMany(models.likes,{
      foreignKey: "userId", sourceKey: 'userId'
    });
  };
  return users;
};
