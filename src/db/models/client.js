const {DataTypes, Model} = require('sequelize');
// const {clientTypes} = require('../../utils/constants');
const sequelize = require('../config/config');

class Client extends Model {}

Client.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clinicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
    },
    // role: {
    //   type: DataTypes.ENUM,
    //   values: ['active', 'pending', 'deleted'],
    // },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'client_users', // We need to choose the model name
  },
);

module.exports = Client;
