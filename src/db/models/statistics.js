const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Stats extends Model {}

Stats.init(
  {
    // Model attributes are defined here
    noOfTokens: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'stats', // We need to choose the model name
  },
);

module.exports = Stats;
