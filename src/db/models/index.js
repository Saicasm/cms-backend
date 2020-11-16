const User = require('./user');
const UserHistory = require('./user-history');
const Token = require('./token');
const Symptoms = require('./symptoms');
const Diseases = require('./diseases');
const ClientUsers = require('./client');
const Stats = require('./statistics');

const Models = {
  User,
  UserHistory,
  Token,
  Symptoms,
  Diseases,
  ClientUsers,
  Stats,
};

// Associations
Models.User.hasMany(UserHistory);
Models.User.hasMany(Token);
Models.Token.belongsTo(User);
Models.UserHistory.belongsTo(User);
module.exports = Models;
