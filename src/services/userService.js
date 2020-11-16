const Sequelize = require('sequelize');
const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const {Op} = Sequelize;

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class UserService {
  static async getAllUsers() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.User.findAll();
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.User.findAll();
      }
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.User.create(newUser);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.User.create(newUser);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      let userToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          userToUpdate = await models.User.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          userToUpdate = await models.User.findOne({
            where: {id: Number(id)},
          });
      }

      if (userToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.User.update(updateUser, {
              where: {id: Number(id)},
            });

            return updateUser;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.User.update(updateUser, {
              where: {id: Number(id)},
            });

            return updateUser;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(id) {
    try {
      let user;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          user = await models.User.findOne({
            where: {id: Number(id)},
          });
          logger.debug(user);
          return user;
        case constants.dbType.DB_MONGO:
          break;
        default:
          user = await models.User.findOne({
            where: {id: Number(id)},
          });

          return user;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      let userId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          userId = await models.User.findOne({where: {id: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          userId = await models.User.findOne({where: {id: Number(id)}});
      }

      if (userId) {
        let deletedUser;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedUser = await models.User.destroy({
              where: {id: Number(id)},
            });
            return deletedUser;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedUser = await models.User.destroy({
              where: {id: Number(id)},
            });
            return deletedUser;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByPhoneNo(phNo) {
    try {
      let user;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          user = await models.User.findAll({
            where: {
              phoneNo: {
                [Op.like]: phNo,
              },
            },
          });
          return user;
        case constants.dbType.DB_MONGO:
          break;
        default:
          user = await models.User.findOne({
            where: {phoneNo: Number(phNo)},
          });

          return user;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUserByName(name) {
    try {
      let user;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          console.log(user);
          user = await models.User.findAll({
            where: {name: {like: `${name}%`}},
          });
          console.log(user);
          return user;
        case constants.dbType.DB_MONGO:
          break;
        default:
          user = await models.User.findAll({
            where: {name: {$iLike: `${name}%`}},
          });

          return user;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUserByPhoneNoAndName(phNo, name) {
    try {
      let user;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          user = await models.User.findOne({
            where: {phoneNo: Number(phNo), name},
          });
          return user;
        case constants.dbType.DB_MONGO:
          break;
        default:
          user = await models.User.findOne({
            where: {phoneNo: Number(phNo)},
          });

          return user;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
