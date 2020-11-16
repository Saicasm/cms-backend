const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Diseases extends Model {}

Diseases.init(
  {
    // Model attributes are defined here
    disease: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'diseases', // We need to choose the model name
    timestamps: false,
  },
);

module.exports = Diseases;
