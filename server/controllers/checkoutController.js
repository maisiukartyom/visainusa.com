const Payment = require('../model/Payment');
const User = require('../model/User');
var nodemailer = require('nodemailer');

const handleCheckout = async (req, res) => {
    const payment = req.body
    try{
        const result = await Payment.create(payment);
        console.log(result);
    }
    catch(err){
        res.status(500).json({ 'message': err.message });
    }
    try{
        await User.findOneAndUpdate({email: payment.payer}, {level: payment.purchasedLevel})
    }
    catch(err){
        res.status(500).json({ 'message': err.message });
    }
    res.status(200);
}

const handleSendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'artyom.majsyuk@gmail.com',
          pass: 'diux piol dnxc euse'
        }
      });
      
      const {email, phoneNumber} = req.body

      const mailOptions = {
        from: 'artyom.majsyuk@gmail.com',
        to: 'maisiukartyom@gmail.com',
        subject: `Anketa response`,
        text: `User's email: ${email}
        User's phone number: ${phoneNumber}`
      };
      
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error.message)
          res.status(500).json({'message': error.message});
        } else {
            res.sendStatus(200);
        }
      });
}

module.exports = {handleCheckout, handleSendEmail}