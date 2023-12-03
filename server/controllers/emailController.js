var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../model/User')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'EB3unskilled@gmail.com',
    pass: 'muzh frte fruc uslx'
  },
  tls : { rejectUnauthorized: false }
  // auth: {
  //   user: 'artyom.majsyuk@gmail.com',
  //   pass: 'uaqx lsln boij einl'
  // }
});

const handleSendEmail = async (req, res) => {
      
      const {email, phoneNumber} = req.body
      const htmlContent = `
        <h1>Anketa Response</h1>
        <p><strong>User's email:</strong> ${email}</p>
        <p><strong>User's phone number:</strong> ${phoneNumber}</p>
      `;


      const mailOptions = {
        from: 'EB3unskilled@gmail.com',
        to: 'EB3unskilled@visainusa.com',
        // from: 'artyom.majsyuk@gmail.com',
        // to: 'maisiukartyom@gmail.com',
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
    const {company, email, phoneNumber, comment} = req.body

    let htmlContent;

    if (comment !== ''){
      htmlContent = `
      <h1>Employer's info</h1>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Company's email:</strong> ${email}</p>
      <p><strong>Phone number:</strong> ${phoneNumber}</p>
      <p><strong>Comment:</strong> ${comment}</p>
    `;
    }
    else{
      htmlContent = `
      <h1>Employer's info</h1>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Company's email:</strong> ${email}</p>
      <p><strong>Phone number:</strong> ${phoneNumber}</p>
    `;
    }

    const mailOptions = {
      // from: 'artyom.majsyuk@gmail.com',
      // to: 'maisiukartyom@gmail.com',
      from: 'EB3unskilled@gmail.com',
      to: 'EB3unskilled@visainusa.com',
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

const handleSendPhone = async (req, res) => {
    const {phone, name} = req.body
    const htmlContent = `
      <h1>Phone call request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    `;

    const mailOptions = {
      // from: 'artyom.majsyuk@gmail.com',
      // to: 'maisiukartyom@gmail.com',
      from: 'EB3unskilled@gmail.com',
      to: 'EB3unskilled@visainusa.com',
      subject: `Contact request`,
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

const sendResetPassword = async (req, res) => {
  try{
      const {email} = req.body;
      try{
        const user = await User.findOne({email});
        if (user.confirmed){
          jwt.sign(
            { 
                "email": email
             },
            process.env.EMAIL_SECRET,
            { expiresIn: '5h' },
            (err, emailToken) => {
                if (err){
                    return res.sendStatus(400);
                }
                const url = `${process.env.URL_API}/auth/confirmReset/${emailToken}`;
                transporter.sendMail({
                    to: email,
                    subject: "Link to password reset",
                    html: `<h2>You have 5 hours to reset your password:</h2>
                            <a href="${url}">Reset link</a>`
                });
                return res.sendStatus(200);
            }
          );
        }
        else{
          res.sendStatus(407);
        }
      }
      catch(err){
        res.sendStatus(406);
      }
  }
  catch(err){
      console.log(err)
      res.sendStatus(406);
  }
}

const sendContract = async (req, res) => {
  try{
    const {email, phoneNumber, fullname} = req.body;

    const htmlContent = `
    <h2>User ${email} has requested to send him a contract to support the EB3 unskilled case</h2>
    <p><strong>Name:</strong> ${fullname}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    `;

    const mailOptions = {
      // from: 'artyom.majsyuk@gmail.com',
      // to: 'maisiukartyom@gmail.com',
      from: 'EB3unskilled@gmail.com',
      to: 'EB3unskilled@visainusa.com',
      subject: `Contract request`,
      html: htmlContent
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).json({'message': error.message});
      } else {
          res.sendStatus(200);
      }
    });
  }
  catch(err){
    res.sendStatus(403);
  }
}

module.exports = {handleSendEmail, handleSendEmployer, handleSendPhone, sendResetPassword, sendContract}