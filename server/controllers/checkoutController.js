const Payment = require('../model/Payment');
const User = require('../model/User');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const handleCheckout = async (req, res) => {
    let payment = req.body
    const token = req.cookies.jwt;
    let email = "";
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, data) => {
          if (err) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(403);
          }
          email = data.email;
          payment = {
            ...payment,
            payer: email
          }
          try{
            console.log(payment.payer)
            const result = await User.findOneAndUpdate({email: payment.payer}, {level: payment.purchasedLevel})
            await Payment.create(payment);
            res.sendStatus(200);
          }
          catch{
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.sendStatus(403);
          }
      }
    );
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