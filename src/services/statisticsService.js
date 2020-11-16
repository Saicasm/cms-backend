const {Op} = require('sequelize');
const moment = require('moment');
const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');
const sequelize = require('../db/config/config');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
const statsTypes = constants.statTypes;
class StatService {
  static async getAllStats(statType, statData) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          switch (statType) {
            case statsTypes.STATS_MONTH:
              return await models.Stats.sum('noOfTokens', {
                where: sequelize.where(
                  sequelize.fn('date_part', 'month', sequelize.col('date')),
                  statData,
                ),
                attributes: {exclude: ['createdAt', 'updatedAt']},
              });
            case statsTypes.STATS_DAILY:
              // return await sequelize.query(
              //   `SELECT sum("noOfTokens") AS "sum" FROM "stats" AS "stats" WHERE date("date")='November 16, 2020'`,
              //   // `SELECT SUM ("noOfTokens"), month("date")

              //   // FROM "stats"

              //   // GROUP BY MONTH ("date"), year("date");`,
              // );
              return await models.Stats.sum('noOfTokens', {
                where: sequelize.where(
                  sequelize.fn('date', sequelize.col('date')),
                  '=',
                  moment().format('LL'),
                ),
                attributes: {exclude: ['createdAt', 'updatedAt']},
              });
            case statsTypes.STATS_WEEK:
              return await models.Stats.sum('noOfTokens', {
                where: {
                  date: {
                    [Op.gte]: moment().subtract(7, 'days').toDate(),
                  },
                },
                attributes: {exclude: ['createdAt', 'updatedAt']},
              });
            case statsTypes.STATS_YEAR:
              return await models.Stats.sum('noOfTokens', {
                where: sequelize.where(
                  sequelize.fn('date_part', 'year', sequelize.col('date')),
                  statData,
                ),

                attributes: {exclude: ['createdAt', 'updatedAt']},
              });
            default:
              break;
          }
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Stats.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      logger.error(error);
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
