const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Token extends Model {}

Token.init(
  {
    // Model attributes are defined here
    tokenNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'token', // We need to choose the model name
  },
);

module.exports = Token;
