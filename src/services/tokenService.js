const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class TokenService {
  static async getAllTokens(limit, offset, order, status) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Token.findAll({
            where: {status},
            limit,
            offset,
            order: [['tokenNo', order]],
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: {
              model: models.User,
              attributes: ['name', 'phoneNo'],
            },
          });
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Token.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
      }
    } catch (error) {
      throw error;
    }
  }

  static async addToken(newToken) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Token.create(newToken);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Token.create(newToken);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateToken(id, updateToken) {
    try {
      let tokenToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          tokenToUpdate = await models.Token.findOne({
            where: {tokenNo: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          tokenToUpdate = await models.Token.findOne({
            where: {tokenNo: Number(id)},
          });
      }

      if (tokenToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Token.update(updateToken, {
              where: {tokenNo: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateToken;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Token.update(updateToken, {
              where: {tokenNo: Number(id)},
              attributes: {exclude: ['createdAt', 'updatedAt']},
            });

            return updateToken;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getToken(id) {
    try {
      let token;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          token = await models.Token.findOne({
            where: {tokenNo: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });
          logger.debug(token);
          return token;
        case constants.dbType.DB_MONGO:
          break;
        default:
          token = await models.Token.findOne({
            where: {tokenNo: Number(id)},
            attributes: {exclude: ['createdAt', 'updatedAt']},
          });

          return token;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteToken(id) {
    try {
      let tokenId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          tokenId = await models.Token.findOne({where: {tokenNo: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          tokenId = await models.Token.findOne({where: {tokenNo: Number(id)}});
      }

      if (tokenId) {
        let deletedToken;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedToken = await models.Token.destroy({
              where: {tokenNo: Number(id)},
            });
            return deletedToken;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedToken = await models.Token.destroy({
              where: {tokenNo: Number(id)},
            });
            return deletedToken;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TokenService;
