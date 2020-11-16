const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/config');

class Medicines extends Model {}

Medicines.init(
  {
    // Model attributes are defined here
    medicine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'medicines', // We need to choose the model name
    timestamps: false,
  },
);

module.exports = Medicines;
