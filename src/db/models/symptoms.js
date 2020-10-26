const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Symptoms extends Model {}

Symptoms.init(
  {
    // Model attributes are defined here
    diseaseName: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'symptoms', // We need to choose the model name
  },
);

module.exports = Symptoms;
