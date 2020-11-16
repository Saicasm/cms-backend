const MedicineService = require('../services/medicineService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class MedicineController {
  static async getAllMedicines(req, res) {
    try {
      const allMedicines = await MedicineService.getAllMedicines();
      if (allMedicines.length > 0) {
        util.setSuccess(
          200,
          constants.MedicineTypes.MedicineS_RETRIEVED,
          allMedicines,
        );
      } else {
        util.setSuccess(200, constants.MedicineTypes.NO_MedicineS);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addMedicine(req, res) {
    if (!req.body.MedicineName) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newMedicine = req.body;
    try {
      const createdMedicine = await MedicineService.addMedicine(newMedicine);
      util.setSuccess(
        201,
        constants.MedicineTypes.Medicine_ADDED,
        createdMedicine,
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateMedicine(req, res) {
    const alteredMedicine = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateMedicine = await MedicineService.updateMedicine(
        id,
        alteredMedicine,
      );
      if (!updateMedicine) {
        util.setError(
          404,
          constants.MedicineTypes.Medicine_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(
          200,
          constants.MedicineTypes.Medicine_UPDATED,
          updateMedicine,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getMedicine(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const Medicine = await MedicineService.getMedicine(id);

      if (!Medicine) {
        util.setError(
          404,
          constants.MedicineTypes.Medicine_NOT_FOUND_WITH_ID + id,
        );
      } else {
        util.setSuccess(200, constants.MedicineTypes.Medicine_FOUND, Medicine);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteMedicine(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const MedicineToDelete = await MedicineService.deleteMedicine(id);

      if (MedicineToDelete) {
        util.setSuccess(200, constants.MedicineTypes.Medicine_DELETED);
      } else {
        util.setError(
          404,
          constants.MedicineTypes.Medicine_NOT_FOUND_WITH_ID + id,
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = MedicineController;
