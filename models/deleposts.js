'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deleposts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deleposts.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      insertDt: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'deleposts',
      timestamps: false,
    }
  );
  return deleposts;
};
