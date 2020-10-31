const {DataTypes, Model} = require('sequelize');
// const constants = require('../../utils/constants');
const sequelize = require('../config/config');

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    bloodGroup: {
      type: DataTypes.STRING,
    },
    type: {
      // type: DataTypes.ENUM(
      //   constants.userTypes.USER_CHILD,
      //   constants.userTypes.USER_PARENT,
      //   constants.userTypes.USER_OTHER,
      // ),
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users', // We need to choose the model name
  },
);

module.exports = User;
