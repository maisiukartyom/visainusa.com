const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyPayment = require('../middleware/verify')


router.post('/', verifyPayment, paymentController.handlePayment);
router.post('/verify', paymentController.handleVerify)
router.post('/paypal-transaction-complete', paymentController.handlePaypalTransactionComplete);
router.get('/getTransactions', paymentController.handleGetTransactions);

module.exports = router;