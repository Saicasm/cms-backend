const models = require('../db/models/index');
const constants = require('../utils/constants');
const logger = require('../utils/logger');

const dbType = process.env.DB_TYPE || constants.dbType.DB_POSTGRES;
class MedicineService {
  static async getAllMedicines() {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Medicines.findAll();
        case constants.dbType.DB_MONGO:
          break;
        default:
          return await models.Medicines.findAll();
      }
    } catch (error) {
      throw error;
    }
  }

  static async addMedicine(newMedicine) {
    try {
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          return await models.Medicines.create(newMedicine);
        case constants.dbType.DB_MONGO:
          break;
        default:
          await models.Medicines.create(newMedicine);
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateMedicine(id, updateMedicine) {
    try {
      let MedicineToUpdate;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          MedicineToUpdate = await models.Medicines.findOne({
            where: {id: Number(id)},
          });
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          MedicineToUpdate = await models.Medicines.findOne({
            where: {id: Number(id)},
          });
      }

      if (MedicineToUpdate) {
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            await models.Medicines.update(updateMedicine, {
              where: {id: Number(id)},
            });

            return updateMedicine;
          case constants.dbType.DB_MONGO:
            break;
          default:
            await models.Medicines.update(updateMedicine, {
              where: {id: Number(id)},
            });

            return updateMedicine;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getMedicine(id) {
    try {
      let Medicine;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          Medicine = await models.Medicines.findOne({
            where: {id: Number(id)},
          });
          logger.debug(Medicine);
          return Medicine;
        case constants.dbType.DB_MONGO:
          break;
        default:
          Medicine = await models.Medicines.findOne({
            where: {id: Number(id)},
          });

          return Medicine;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteMedicine(id) {
    try {
      let MedicineId;
      switch (dbType) {
        case constants.dbType.DB_POSTGRES:
          MedicineId = await models.Medicines.findOne({where: {id: Number(id)}});
          break;
        case constants.dbType.DB_MONGO:
          break;
        default:
          MedicineId = await models.Medicines.findOne({where: {id: Number(id)}});
      }

      if (MedicineId) {
        let deletedMedicine;
        switch (dbType) {
          case constants.dbType.DB_POSTGRES:
            deletedMedicine = await models.Medicines.destroy({
              where: {id: Number(id)},
            });
            return deletedMedicine;
          case constants.dbType.DB_MONGO:
            break;
          default:
            deletedMedicine = await models.Medicines.destroy({
              where: {id: Number(id)},
            });
            return deletedMedicine;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MedicineService;
