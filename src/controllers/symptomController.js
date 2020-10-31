const SymptomService = require('../services/symptomService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class SymptomController {
  static async getAllSymptoms(req, res) {
    try {
      const allSymptoms = await SymptomService.getAllSymptoms();
      if (allSymptoms.length > 0) {
        util.setSuccess(
          200,
          constants.symptomTypes.SYMPTOMS_RETRIEVED,
          allSymptoms,
        );
      } else {
        util.setSuccess(200, constants.symptomTypes.NO_DISEASES);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addSymptom(req, res) {
    if (!req.body.symptomName) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newSymptom = req.body;
    try {
      const createdSymptom = await SymptomService.addSymptom(newSymptom);
      util.setSuccess(
        201,
        constants.symptomTypes.SYMPTOM_ADDED,
        createdSymptom,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateSymptom(req, res) {
    const alteredSymptom = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateSymptom = await SymptomService.updateSymptom(
        id,
        alteredSymptom,
      );
      if (!updateSymptom) {
        util.setError(
          404,
          constants.symptomTypes.SYMPTOM_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.symptomTypes.SYMPTOM_UPDATED,
          updateSymptom,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getSymptom(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const symptom = await SymptomService.getSymptom(id);

      if (!symptom) {
        util.setError(
          404,
          constants.symptomTypes.SYMPTOM_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(200, constants.symptomTypes.SYMPTOM_FOUND, symptom);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteSymptom(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const symptomToDelete = await SymptomService.deleteSymptom(id);

      if (symptomToDelete) {
        util.setSuccess(200, constants.symptomTypes.SYMPTOM_DELETED);
      } else {
        util.setError(
          404,
          constants.symptomTypes.SYMPTOM_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = SymptomController;
