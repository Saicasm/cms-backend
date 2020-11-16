const express = require('express');
const AdviceController = require('../controllers/adviceController');

const router = express.Router();

router.get('/', AdviceController.getAllAdvices);
router.post('/', AdviceController.addAdvice);
router.get('/:id', AdviceController.getAdvice);
router.put('/:id', AdviceController.updateAdvice);
router.delete('/:id', AdviceController.deleteAdvice);

module.exports = router;
