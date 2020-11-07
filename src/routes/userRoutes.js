const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUser);
router.get('/user-details/:id', UserController.getUser);
router.get(
  '/user-details-by-phoneNumber-or-name',
  UserController.getUserDetailsByPhoneNoOrName,
);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
