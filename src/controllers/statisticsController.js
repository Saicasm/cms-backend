const StatService = require('../services/statisticsService');
const constants = require('../utils/constants');
const Util = require('../utils/utils');

const util = new Util();

class StatController {
  static async getAllStats(req, res) {
    try {
      const allStats = await StatService.getAllStats();
      if (allStats.length > 0) {
        util.setSuccess(200, constants.statTypes.STATS_RETRIEVED, allStats);
      } else {
        util.setSuccess(200, constants.statTypes.NO_STATS);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addStat(req, res) {
    if (!req.body.tokens) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    const newStat = req.body;
    try {
      const createdStat = await StatService.addStat(newStat);
      util.setSuccess(201, constants.statTypes.STAT_ADDED, createdStat);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateStat(req, res) {
    const alteredStat = req.body;
    const {id} = req.params;
    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }
    try {
      const updateStat = await StatService.updateStat(id, alteredStat);
      if (!updateStat) {
        util.setError(404, constants.statTypes.STAT_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(200, constants.statTypes.STAT_UPDATED, updateStat);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getStat(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const stat = await StatService.getStat(id);

      if (!stat) {
        util.setError(404, constants.statTypes.STAT_NOT_FOUND_WITH_ID + id);
      } else {
        util.setSuccess(200, constants.statTypes.STAT_FOUND, stat);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteStat(req, res) {
    const {id} = req.params;

    if (!Number(id)) {
      util.setError(400, constants.errorTypes.ERROR_INPUT_VALUE);
      return util.send(res);
    }

    try {
      const statToDelete = await StatService.deleteStat(id);

      if (statToDelete) {
        util.setSuccess(200, constants.statTypes.STAT_DELETED);
      } else {
        util.setError(404, constants.statTypes.STAT_NOT_FOUND_WITH_ID + id);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = StatController;
