const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class UserHistoryService {
  static async getAllUserHistories(limit, offset) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.UserHistory.findAll({
            limit,
            offset,
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.UserHistory.findAll({
            limit,
            offset,
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addUserHistory(newUserHistory) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.UserHistory.create(newUserHistory);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.UserHistory.create(newUserHistory);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateUserHistory(id, updateUserHistory) {
    try {
      let UserHistoryToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          UserHistoryToUpdate = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          UserHistoryToUpdate = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });
      }

      if (UserHistoryToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.UserHistory.update(updateUserHistory, {
              where: {id: Number(id)},
            });

            return updateUserHistory;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.UserHistory.update(updateUserHistory, {
              where: {id: Number(id)},
            });

            return updateUserHistory;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getUserHistory(id) {
    try {
      let UserHistory;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          UserHistory = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });
          return UserHistory;
        case constants.dbType.DB_MONGO:
          break;
        default:
          UserHistory = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });

          return UserHistory;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getUserHistoryByUserId(userId, limit, offset) {
    try {
      let UserHistoryForUserId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          UserHistoryForUserId = await models.UserHistory.findAll({
            where: {userId: Number(userId)},
            limit,
            offset,
            order: [['id', 'DESC']],
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: {
              model: models.User,
              attributes: ['name'],
            },
          });
          logger.debug(UserHistoryForUserId);
          return UserHistoryForUserId;
        case constants.dbType.DB_MONGO:
          break;
        default:
          UserHistoryForUserId = await models.UserHistory.findAll({
            where: {userId: Number(userId)},
            limit,
            offset,
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return UserHistoryForUserId;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserHistory(id) {
    try {
      let UserHistoryId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          UserHistoryId = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          UserHistoryId = await models.UserHistory.findOne({
            where: {id: Number(id)},
          });
      }

      if (UserHistoryId) {
        let deletedUserHistory;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedUserHistory = await models.UserHistory.destroy({
              where: {id: Number(id)},
            });
            return deletedUserHistory;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedUserHistory = await models.UserHistory.destroy({
              where: {id: Number(id)},
            });
            return deletedUserHistory;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserHistoryService;
