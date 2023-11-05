const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/', checkoutController.handleCheckout);
router.post('/sendEmail', checkoutController.handleSendEmail);

module.exports = router;