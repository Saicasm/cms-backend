const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class DiseaseService {
  static async getAllDiseases() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Diseases.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Diseases.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addDisease(newDisease) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Diseases.create(newDisease);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Diseases.create(newDisease);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateDisease(id, updateDisease) {
    try {
      let diseaseToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          diseaseToUpdate = await models.Diseases.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          diseaseToUpdate = await models.Diseases.findOne({
            where: {id: Number(id)},
          });
      }

      if (diseaseToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Diseases.update(updateDisease, {
              where: {id: Number(id)},
            });

            return updateDisease;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Diseases.update(updateDisease, {
              where: {id: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateDisease;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getDisease(id) {
    try {
      let disease;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          disease = await models.Diseases.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
          logger.debug(disease);
          return disease;
        case constants.dbType.DB_MONGO:
          break;
        default:
          disease = await models.Diseases.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return disease;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteDisease(id) {
    try {
      let diseaseId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          diseaseId = await models.Diseases.findOne({where: {id: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          diseaseId = await models.Diseases.findOne({where: {id: Number(id)}});
      }

      if (diseaseId) {
        let deletedDisease;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedDisease = await models.Diseases.destroy({
              where: {id: Number(id)},
            });
            return deletedDisease;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedDisease = await models.Diseases.destroy({
              where: {id: Number(id)},
            });
            return deletedDisease;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiseaseService;
