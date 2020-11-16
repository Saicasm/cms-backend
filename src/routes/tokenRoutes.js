const express = require('express');
const TokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/get-token-details/', TokenController.getToken);
router.get('/', TokenController.getAllTokens);
router.post('/', TokenController.addToken);
router.put('/:id', TokenController.updateToken);
router.delete('/:id', TokenController.deleteToken);

module.exports = router;
