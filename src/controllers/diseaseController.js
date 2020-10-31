const DiseaseService = require('../services/diseaseService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class DiseaseController {
  static async getAllDiseases(req, res) {
    try {
      const allDiseases = await DiseaseService.getAllDiseases();
      if (allDiseases.length > 0) {
        util.setSuccess(
          200,
          constants.diseaseTypes.DISEASES_RETRIEVED,
          allDiseases,
        );
      } else {
        util.setSuccess(200, constants.diseaseTypes.NO_DISEASES);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addDisease(req, res) {
    if (!req.body.diseaseName) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newDisease = req.body;
    try {
      const createdDisease = await DiseaseService.addDisease(newDisease);
      util.setSuccess(
        201,
        constants.diseaseTypes.DISEASE_ADDED,
        createdDisease,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateDisease(req, res) {
    const alteredDisease = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateDisease = await DiseaseService.updateDisease(
        id,
        alteredDisease,
      );
      if (!updateDisease) {
        util.setError(
          404,
          constants.diseaseTypes.DISEASE_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.diseaseTypes.DISEASE_UPDATED,
          updateDisease,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getDisease(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const disease = await DiseaseService.getDisease(id);

      if (!disease) {
        util.setError(
          404,
          constants.diseaseTypes.DISEASE_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(200, constants.diseaseTypes.DISEASE_FOUND, disease);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteDisease(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const diseaseToDelete = await DiseaseService.deleteDisease(id);

      if (diseaseToDelete) {
        util.setSuccess(200, constants.diseaseTypes.DISEASE_DELETED);
      } else {
        util.setError(
          404,
          constants.diseaseTypes.DISEASE_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = DiseaseController;
