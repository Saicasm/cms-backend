const express = require('express');
const SymptomController = require('../controllers/symptomController');

const router = express.Router();

router.get('/', SymptomController.getAllSymptoms);
router.post('/', SymptomController.addSymptom);
router.get('/:id', SymptomController.getSymptom);
router.put('/:id', SymptomController.updateSymptom);
router.delete('/:id', SymptomController.deleteSymptom);

module.exports = router;
