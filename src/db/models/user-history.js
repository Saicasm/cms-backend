const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class UserHistory extends Model {}

UserHistory.init(
  {
    diseases: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prescriptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    comments: {
      type: DataTypes.TEXT,
    },
    advice: {
      type: DataTypes.TEXT,
    },
    tokenId: {
      type: DataTypes.STRING,
    },
    drAssigned: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'user_histories', // We need to choose the model name
  },
);

module.exports = UserHistory;
