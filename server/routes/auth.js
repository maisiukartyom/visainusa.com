const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);
router.get('/logout', authController.handleLogout);
router.post('/verify', authController.userVerification);
router.get('/confirmEmail/:token', authController.confirmEmail);
router.post('/setPassword', authController.setPassword);
router.get('/confirmReset/:token', authController.confirmReset);

module.exports = router;