const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);

module.exports = router;