const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyPayment = require('../middleware/verify')


router.post('/', verifyPayment, paymentController.handlePayment);
router.post('/verify', paymentController.handleVerify)
router.post('/paypal-transaction-complete', paymentController.handlePaypalTransactionComplete);
router.get('/getTransactions', paymentController.handleGetTransactions);
router.post('/getLevelCost', paymentController.getLevelCost);
router.get('/getLevelsCosts', paymentController.getLevelsCosts);
router.post('/updateLevels', paymentController.updateLevels);
router.post('/create-payment-intent', paymentController.createIntent);
router.post('/success', paymentController.success);
module.exports = router;