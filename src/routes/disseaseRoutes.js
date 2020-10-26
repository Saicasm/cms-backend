const express = require('express');
const DiseaseController = require('../controllers/diseaseController');

const router = express.Router();

router.get('/', DiseaseController.getAllUsers);
router.post('/', DiseaseController.addUser);
router.get('/:id', DiseaseController.getUser);
router.put('/:id', DiseaseController.updateUser);
router.delete('/:id', DiseaseController.deleteUser);

module.exports = router;
