const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');


router.post('/sendEmail', emailController.handleSendEmail);
router.post('/sendEmployerInfo', emailController.handleSendEmployer);
router.post('/sendPhone', emailController.handleSendPhone);
router.post('/sendResetPassword', emailController.sendResetPassword);
router.post('/sendContract', emailController.sendContract);

module.exports = router;