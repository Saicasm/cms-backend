const express = require('express');
const MedicineController = require('../controllers/medicineController');

const router = express.Router();

router.get('/', MedicineController.getAllMedicines);
router.post('/', MedicineController.addMedicine);
router.get('/:id', MedicineController.getMedicine);
router.put('/:id', MedicineController.updateMedicine);
router.delete('/:id', MedicineController.deleteMedicine);

module.exports = router;
