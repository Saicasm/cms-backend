const express = require('express');
const ClientUserController = require('../controllers/clientUserController');

const router = express.Router();

router.get('/', ClientUserController.getAllClientUsers);
router.post('/', ClientUserController.addClientUser);
router.get('/:id', ClientUserController.getClientUser);
router.put('/:id', ClientUserController.updateClientUser);
router.delete('/:id', ClientUserController.deleteClientUser);

module.exports = router;
