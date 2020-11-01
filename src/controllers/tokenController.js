const TokenService = require('../services/tokenService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');
const UserService = require('../services/userService');
const logger = require('../utils/logger');
const util = new Util();

class TokenController {
  static async getAllTokens(req, res) {
    try {
      const allTokens = await TokenService.getAllTokens();
      if (allTokens.length > 0) {
        util.setSuccess(200, constants.tokenTypes.TOKENS_RETRIEVED, allTokens);
      } else {
        util.setSuccess(200, constants.tokenTypes.NO_TOKEN_FOUND);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addToken(req, res) {
    if (!req.body.tokenNo) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newToken = req.body;
    try {
      const createdToken = await TokenService.addToken(newToken);
      util.setSuccess(201, constants.tokenTypes.TOKEN_ADDED, createdToken);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateToken(req, res) {
    const alteredToken = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateToken = await TokenService.updateToken(id, alteredToken);
      if (!updateToken) {
        util.setError(404, constants.tokenTypes.TOKEN_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(
          200,
          constants.tokenTypes.TOKEN_FOUND_WITH_ID,
          updateToken,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getToken(req, res) {
    const tokenId = req.query.tokenId;
    console.log('naveen');
    console.log(req.query);
    if (!Number(tokenId)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const token = await TokenService.getToken(tokenId);
      console.log(token);
      const user = await UserService.getUser(token.dataValues.userId);

      const result = {
        ...token,
        ...user,
      };
      console.log(result);
      if (!token) {
        util.setError(404, constants.tokenTypes.TOKEN_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(200, constants.tokenTypes.TOKEN_FOUND, result);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteToken(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const tokenToDelete = await TokenService.deleteToken(id);

      if (tokenToDelete) {
        util.setSuccess(200, constants.tokenTypes.TOKEN_DELETED);
      } else {
        util.setError(404, constants.tokenTypes.TOKEN_NOT_FOUND_WITH_ID + id);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = TokenController;
