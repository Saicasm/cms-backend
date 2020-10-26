const express = require('express');
const TokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/', TokenController.getAllUsers);
router.post('/', TokenController.addUser);
router.get('/:id', TokenController.getUser);
router.put('/:id', TokenController.updateUser);
router.delete('/:id', TokenController.deleteUser);

module.exports = router;
