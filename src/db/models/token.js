const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Token extends Model {}

Token.init(
  {
    // Model attributes are defined here
    tokenNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    drAssigned: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'token', // We need to choose the model name
  },
);

module.exports = Token;
