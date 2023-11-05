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
            const accessToken = jwt.sign(
              { 
                  "email": result.email,
                  "roles": result.roles,
                  "level": payment.purchasedLevel
               },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1d' }
            );
            res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
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
      const htmlContent = `
        <h1>Anketa Response</h1>
        <p><strong>User's email:</strong> ${email}</p>
        <p><strong>User's phone number:</strong> ${phoneNumber}</p>
      `;


      const mailOptions = {
        from: 'artyom.majsyuk@gmail.com',
        to: 'maisiukartyom@gmail.com',
        subject: `Anketa response`,
        html: htmlContent
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

const handleSendEmployer = async (req, res) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'artyom.majsyuk@gmail.com',
        pass: 'diux piol dnxc euse'
      }
    });
    
    const {company, email, time, phoneNumber} = req.body

    const htmlContent = `
      <h1>Employer's info</h1>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Company's email:</strong> ${email}</p>
      <p><strong>Suitable time:</strong> ${time}</p>
      <p><strong>Phone number:</strong> ${phoneNumber}</p>
    `;


    const mailOptions = {
      from: 'artyom.majsyuk@gmail.com',
      to: 'maisiukartyom@gmail.com',
      subject: `Employer inquiry `,
      html: htmlContent
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

module.exports = {handleCheckout, handleSendEmail, handleSendEmployer}