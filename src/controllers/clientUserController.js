const ClientUserService = require('../services/clientUserService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class ClientUserController {
  static async getAllClientUsers(req, res) {
    try {
      const allClientUsers = await ClientUserService.getAllClientUsers();
      if (allClientUsers.length > 0) {
        util.setSuccess(
          200,
          constants.clientUserTypes.CLIENT_USERS_RETRIEVED,
          allClientUsers,
        );
      } else {
        util.setSuccess(200, constants.clientUserTypes.NO_CLIENT_USERS);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addClientUser(req, res) {
    if (!req.body.name) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newClientUser = req.body;
    try {
      const createdClientUser = await ClientUserService.addClientUser(
        newClientUser,
      );
      util.setSuccess(
        201,
        constants.clientUserTypes.CLIENT_USER_ADDED,
        createdClientUser,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateClientUser(req, res) {
    const alteredClientUser = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateClientUser = await ClientUserService.updateClientUser(
        id,
        alteredClientUser,
      );
      if (!updateClientUser) {
        util.setError(
          404,
          constants.clientUserTypes.CLIENT_USER_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.clientUserTypes.CLIENT_USER_UPDATED,
          updateClientUser,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getClientUser(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const clientUser = await ClientUserService.getClientUser(id);

      if (!clientUser) {
        util.setError(
          404,
          constants.clientUserTypes.CLIENT_USER_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.clientUserTypes.CLIENT_USER_FOUND,
          clientUser,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteClientUser(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const clientUserToDelete = await ClientUserService.deleteClientUser(id);

      if (clientUserToDelete) {
        util.setSuccess(200, constants.clientUserTypes.CLIENT_USER_DELETED);
      } else {
        util.setError(
          404,
          constants.clientUserTypes.CLIENT_USER_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = ClientUserController;
