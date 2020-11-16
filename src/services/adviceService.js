const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class AdviceService {
  static async getAllAdvices() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Advices.findAll();
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Advices.findAll();
      }
    } catch (error) {
      throw error;
    }
  }

  static async addAdvice(newAdvice) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Advices.create(newAdvice);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Advices.create(newAdvice);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateAdvice(id, updateAdvice) {
    try {
      let AdviceToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          AdviceToUpdate = await models.Advices.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          AdviceToUpdate = await models.Advices.findOne({
            where: {id: Number(id)},
          });
      }

      if (AdviceToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Advices.update(updateAdvice, {
              where: {id: Number(id)},
            });

            return updateAdvice;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Advices.update(updateAdvice, {
              where: {id: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateAdvice;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAdvice(id) {
    try {
      let Advice;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          Advice = await models.Advices.findOne({
            where: {id: Number(id)},
          });
          logger.debug(Advice);
          return Advice;
        case constants.dbType.DB_MONGO:
          break;
        default:
          Advice = await models.Advices.findOne({
            where: {id: Number(id)},
          });

          return Advice;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteAdvice(id) {
    try {
      let AdviceId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          AdviceId = await models.Advices.findOne({where: {id: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          AdviceId = await models.Advices.findOne({where: {id: Number(id)}});
      }

      if (AdviceId) {
        let deletedAdvice;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedAdvice = await models.Advices.destroy({
              where: {id: Number(id)},
            });
            return deletedAdvice;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedAdvice = await models.Advices.destroy({
              where: {id: Number(id)},
            });
            return deletedAdvice;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdviceService;
