const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class StatService {
  static async getAllStats() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Stats.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Stats.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addStat(newStat) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Stats.create(newStat);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Stats.create(newStat);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateStat(id, updateStat) {
    try {
      let statToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          statToUpdate = await models.Stats.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          statToUpdate = await models.Stats.findOne({
            where: {id: Number(id)},
          });
      }

      if (statToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Stats.update(updateStat, {
              where: {id: Number(id)},
            });

            return updateStat;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Stats.update(updateStat, {
              where: {id: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateStat;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getStat(id) {
    try {
      let stat;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          stat = await models.Stats.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
          logger.debug(stat);
          return stat;
        case constants.dbType.DB_MONGO:
          break;
        default:
          stat = await models.Stats.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return stat;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteStat(id) {
    try {
      let statId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          statId = await models.Stats.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          statId = await models.Stats.findOne({
            where: {id: Number(id)},
          });
      }

      if (statId) {
        let deletedStat;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedStat = await models.Stats.destroy({
              where: {id: Number(id)},
            });
            return deletedStat;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedStat = await models.Stats.destroy({
              where: {id: Number(id)},
            });
            return deletedStat;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatService;
