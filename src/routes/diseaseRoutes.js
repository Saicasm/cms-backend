const express = require('express');
const DiseaseController = require('../controllers/diseaseController');

const router = express.Router();

router.get('/', DiseaseController.getAllDiseases);
router.post('/', DiseaseController.addDisease);
router.get('/:id', DiseaseController.getDisease);
router.put('/:id', DiseaseController.updateDisease);
router.delete('/:id', DiseaseController.deleteDisease);

module.exports = router;
