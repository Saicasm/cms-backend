const AdviceService = require('../services/adviceService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class AdviceController {
  static async getAllAdvices(req, res) {
    try {
      const allAdvices = await AdviceService.getAllAdvices();
      if (allAdvices.length > 0) {
        util.setSuccess(
          200,
          constants.adviceTypes.AdviceS_RETRIEVED,
          allAdvices,
        );
      } else {
        util.setSuccess(200, constants.adviceTypes.NO_ADVICES);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addAdvice(req, res) {
    if (!req.body.AdviceName) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newAdvice = req.body;
    try {
      const createdAdvice = await AdviceService.addAdvice(newAdvice);
      util.setSuccess(
        201,
        constants.adviceTypes.ADVICE_ADDED,
        createdAdvice,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateAdvice(req, res) {
    const alteredAdvice = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateAdvice = await AdviceService.updateAdvice(
        id,
        alteredAdvice,
      );
      if (!updateAdvice) {
        util.setError(
          404,
          constants.adviceTypes.ADVICE + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.adviceTypes.ADVICE_UPDATED,
          updateAdvice,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAdvice(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const Advice = await AdviceService.getAdvice(id);

      if (!Advice) {
        util.setError(
          404,
          constants.adviceTypes.ADVICE_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(200, constants.adviceTypes.ADVICE_FOUND, Advice);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteAdvice(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const AdviceToDelete = await AdviceService.deleteAdvice(id);

      if (AdviceToDelete) {
        util.setSuccess(200, constants.adviceTypes.ADVICE_DELETED);
      } else {
        util.setError(
          404,
          constants.adviceTypes.Advice_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = AdviceController;
