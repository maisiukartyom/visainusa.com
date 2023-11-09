var nodemailer = require('nodemailer');

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

module.exports = {handleSendEmail, handleSendEmployer}