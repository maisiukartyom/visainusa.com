const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.handleCheckout);
router.get('/level1', checkoutController.handleLevel1);
router.post('/sendEmail', checkoutController.handleSendEmail);
router.post('/sendEmployerInfo', checkoutController.handleSendEmployer);
router.post('/verify', checkoutController.handleVerify)

module.exports = router;