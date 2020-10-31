const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class SymptomService {
  static async getAllSymptoms() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Symptoms.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Symptoms.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addSymptom(newSymptom) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Symptoms.create(newSymptom);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Symptoms.create(newSymptom);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateSymptom(id, updateSymptom) {
    try {
      let symptomToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          symptomToUpdate = await models.Symptoms.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          symptomToUpdate = await models.Symptoms.findOne({
            where: {id: Number(id)},
          });
      }

      if (symptomToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Symptoms.update(updateSymptom, {
              where: {id: Number(id)},
            });

            return updateSymptom;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Symptoms.update(updateSymptom, {
              where: {id: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateSymptom;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSymptom(id) {
    try {
      let symptom;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          symptom = await models.Symptoms.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
          logger.debug(symptom);
          return symptom;
        case constants.dbType.DB_MONGO:
          break;
        default:
          symptom = await models.Symptoms.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return symptom;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteSymptom(id) {
    try {
      let symptomId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          symptomId = await models.Symptoms.findOne({where: {id: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          symptomId = await models.Symptoms.findOne({where: {id: Number(id)}});
      }

      if (symptomId) {
        let deletedSymptom;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedSymptom = await models.Symptoms.destroy({
              where: {id: Number(id)},
            });
            return deletedSymptom;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedSymptom = await models.Symptoms.destroy({
              where: {id: Number(id)},
            });
            return deletedSymptom;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SymptomService;
