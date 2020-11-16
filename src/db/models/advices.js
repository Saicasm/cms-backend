const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Advices extends Model {}

Advices.init(
  {
    // Model attributes are defined here
    advice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'advices', // We need to choose the model name
    timestamps: false,
  },
);

module.exports = Advices;
