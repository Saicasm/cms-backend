const express = require('express');
const UserHistoryController = require('../controllers/userHistoryController');

const router = express.Router();

router.get('/', UserHistoryController.getAllUserHistories);
router.post('/', UserHistoryController.addUserHistory);
router.get('/user/:userId', UserHistoryController.getUserHistoryByUserId);
router.get('/:id', UserHistoryController.getUserHistory);
router.put('/:id', UserHistoryController.updateUserHistory);
router.delete('/:id', UserHistoryController.deleteUserHistory);

module.exports = router;
