const UserService = require('../services/userService');
const constants = require('../utils/constants');
const logger = require('../utils/logger');
const Util = require('../utils/utils');

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > 0) {
        util.setSuccess(200, constants.userTypes.USERS_RETRIEVED, allUsers);
      } else {
        util.setSuccess(200, constants.userTypes.NO_USERS);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addUser(req, res) {
    if (!req.body.name || !req.body.phoneNo || !req.body.address) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newUser = req.body;
    try {
      const createdUser = await UserService.addUser(newUser);
      util.setSuccess(201, constants.userTypes.USER_ADDED, createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateUser(req, res) {
    const alteredUser = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateUser = await UserService.updateUser(id, alteredUser);
      if (!updateUser) {
        util.setError(404, constants.userTypes.USER_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(200, constants.userTypes.USER_UPDATED, updateUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    const {id} = req.params;
    const {phoneNo, name} = req.query;
    if (phoneNo) {
      if (!Number(phoneNo)) {
        util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
        return util.send(res);
      }
      logger.info(name);
      if (phoneNo && name) {
        try {
          const user = await UserService.getUserByPhoneNoAndName(phoneNo, name);

          if (!user) {
            util.setError(
              404,
              constants.userTypes.USER_WITH_PHONE_NOT_FOUND + phoneNo,
            );
          } else {
            util.setSuccess(200, constants.userTypes.USER_FOUND, user);
          }
          return util.send(res);
        } catch (error) {
          util.setError(404, error);
          return util.send(res);
        }
      }
      try {
        const user = await UserService.getUserByPhoneNo(phoneNo);

        if (!user) {
          util.setError(
            404,
            constants.userTypes.USER_WITH_PHONE_NOT_FOUND + phoneNo,
          );
        } else {
          util.setSuccess(200, constants.userTypes.USER_WITH_PHONE_FOUND, user);
        }
        return util.send(res);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    }
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const user = await UserService.getUser(id);

      if (!user) {
        util.setError(404, constants.userTypes.USER_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(200, constants.userTypes.USER_FOUND, user);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const userToDelete = await UserService.deleteUser(id);

      if (userToDelete) {
        util.setSuccess(200, constants.userTypes.USER_DELETED);
      } else {
        util.setError(404, constants.userTypes.USER_NOT_FOUND_WITH_ID + id);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserController;
