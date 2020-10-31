const express = require('express');
const StatsController = require('../controllers/statisticsController');

const router = express.Router();

router.get('/', StatsController.getAllStats);
router.post('/', StatsController.addStat);
router.get('/:id', StatsController.getStat);
router.put('/:id', StatsController.updateStat);
router.delete('/:id', StatsController.deleteStat);

module.exports = router;
