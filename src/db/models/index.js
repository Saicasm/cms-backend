const User = require('./user');
const UserHistory = require('./user-history');
const Token = require('./token');
const Symptoms = require('./symptoms');
const Diseases = require('./diseases');

const Models = {
  User,
  UserHistory,
  Token,
  Symptoms,
  Diseases,
};

// Associations
Models.User.hasMany(UserHistory);
Models.Token.belongsTo(User);
Models.UserHistory.belongsTo(User);
module.exports = Models;
