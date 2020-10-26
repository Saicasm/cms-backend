const express = require('express');
const TokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/', TokenController.getAllTokens);
router.post('/', TokenController.addToken);
router.get('/:id', TokenController.getToken);
router.put('/:id', TokenController.updateToken);
router.delete('/:id', TokenController.deleteToken);

module.exports = router;
