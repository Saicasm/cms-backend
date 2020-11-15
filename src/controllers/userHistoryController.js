const UserHistoryService = require('../services/userHistoryService');
const constants = require('../utils/constants');
const logger = require('../utils/logger');
// const logger = require('../utils/logger');
const Util = require('../utils/utils');

const util = new Util();

class UserHistoryController {
  static async getAllUserHistories(req, res) {
    const {limit, offset} = req.query;
    try {
      const allUserHistories = await UserHistoryService.getAllUserHistories(
        limit,
        offset,
      );
      if (allUserHistories.length > 0) {
        util.setSuccess(
          200,
          constants.userHistoryTypes.USERS_HISTORIES_RETRIEVED,
          allUserHistories,
        );
      } else {
        util.setSuccess(200, constants.userHistoryTypes.NO_USER_HISTORIES);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addUserHistory(req, res) {
    if (!req.body.diseases || !req.body.symptoms || !req.body.prescriptions) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newUserHistory = req.body;
    console.log(req.body);
    const {status, userId, tokenId} = req.body;
    console.log(status + userId + tokenId);
    try {
      const createdUserHistory = await UserHistoryService.addUserHistory(
        newUserHistory,
      );
      util.setSuccess(
        201,
        constants.userHistoryTypes.USER_HISTORY_ADDED,
        createdUserHistory,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateUserHistory(req, res) {
    const alteredUserHistory = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateUserHistory = await UserHistoryService.updateUserHistory(
        id,
        alteredUserHistory,
      );
      if (!updateUserHistory) {
        util.setError(
          404,
          constants.userHistoryTypes.USER_HISTORY_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.userHistoryTypes.USER_HISTORY_UPDATED,
          updateUserHistory,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getUserHistory(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const userHistory = await UserHistoryService.getUserHistory(id);
      if (!userHistory) {
        util.setError(
          404,
          constants.userHistoryTypes.USER_HISTORY_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.userHistoryTypes.USER_HISTORY_FOUND_WITH_ID,
          userHistory,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getUserHistoryByUserId(req, res) {
    const {userId} = req.params;
    const {limit, offset} = req.query;
    if (limit || offset) {
      if (!Number(limit)) {
        util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
        return util.send(res);
      }
      try {
        const userHistory = await UserHistoryService.getUserHistoryByUserId(
          userId,
          limit,
          offset,
        );

        if (!userHistory) {
          util.setError(
            404,
            constants.userHistoryTypes.USER_HISTORY_FOR_USER_NOT_FOUND + userId,
          );
        } else {
          util.setSuccess(
            200,
            constants.userHistoryTypes.USER_HISTORY_FOR_USER_FOUND,
            userHistory,
          );
        }
        return util.send(res);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    }
    if (!Number(userId)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const user = await UserHistoryService.getUserHistoryByUserId(userId);

      if (!user) {
        util.setError(
          404,
          constants.userHistoryTypes.USER_HISTORY_FOR_USER_NOT_FOUND + userId,
        );
      } else {
        util.setSuccess(
          200,
          constants.userHistoryTypes.USER_HISTORY_FOR_USER_FOUND,
          user,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteUserHistory(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const userHistoryToDelete = await UserHistoryService.deleteUserHistory(
        id,
      );

      if (userHistoryToDelete) {
        util.setSuccess(200, constants.userHistoryTypes.USER_HISTORY_DELETED);
      } else {
        util.setError(
          404,
          constants.userHistoryTypes.USER_HISTORY_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserHistoryController;
