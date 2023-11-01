const Payment = require('../model/Payment');

const handleCheckout = async (req, res) => {
    const payment = req.body
    try{
        const result = await Payment.create(payment);
        console.log(result);
    }
    catch(err){
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {handleCheckout}