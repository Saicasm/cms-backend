const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class ClientUserService {
  static async getAllClientUsers() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.ClientUsers.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.ClientUsers.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addClientUser(newClientUser) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.ClientUsers.create(newClientUser);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.ClientUsers.create(newClientUser);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateClientUser(id, updateClientUser) {
    try {
      let clientUserToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          clientUserToUpdate = await models.ClientUsers.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          clientUserToUpdate = await models.ClientUsers.findOne({
            where: {id: Number(id)},
          });
      }

      if (clientUserToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.ClientUsers.update(updateClientUser, {
              where: {id: Number(id)},
            });

            return updateClientUser;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.ClientUsers.update(updateClientUser, {
              where: {id: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateClientUser;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getClientUser(id) {
    try {
      let clientUser;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          clientUser = await models.ClientUsers.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
          logger.debug(clientUser);
          return clientUser;
        case constants.dbType.DB_MONGO:
          break;
        default:
          clientUser = await models.ClientUsers.findOne({
            where: {id: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return clientUser;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteClientUser(id) {
    try {
      let clientUserId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          clientUserId = await models.ClientUsers.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          clientUserId = await models.ClientUsers.findOne({
            where: {id: Number(id)},
          });
      }

      if (clientUserId) {
        let deletedClientUser;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedClientUser = await models.ClientUsers.destroy({
              where: {id: Number(id)},
            });
            return deletedClientUser;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedClientUser = await models.ClientUsers.destroy({
              where: {id: Number(id)},
            });
            return deletedClientUser;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClientUserService;
