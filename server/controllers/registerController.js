const User = require('../model/User');
const bcrypt = require('bcrypt');
const axios = require('axios');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'EB3unskilled@gmail.com',
      pass: 'muzh frte fruc uslx'
    }
    // auth: {
    //   user: 'artyom.majsyuk@gmail.com',
    //   pass: 'uaqx lsln boij einl'
    // }
  });

const sendLink = async (req, res) => {
    const email = req.body.email
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
            const url = `${process.env.URL_API}/auth/confirmEmail/${emailToken}`;
            transporter.sendMail({
                to: email,
                subject: "Confirm email",
                html: `<h2>You have 5 hours to confirm your email:</h2>
                        <a href="${url}">Link to verify</a>`
            });
            return res.sendStatus(200);
        }
    );
}

const handleNewUser = async (req, res) => {
    const { fullname, email, password, phoneNumber } = req.body;

    if (!fullname || !email || !password || !phoneNumber) return res.status(400).json({ 'message': 'Email, password, fullname and phoneNumber are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email });
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            fullname: fullname,
            email: email,
            password: hashedPwd,
            phoneNumber: phoneNumber
        });

        jwt.sign(
            { 
                "email": email
             },
            process.env.EMAIL_SECRET,
            { expiresIn: '5h' },
            (err, emailToken) => {
                const url = `${process.env.URL_API}/auth/confirmEmail/${emailToken}`;
                transporter.sendMail({
                    to: email,
                    subject: "Confirm email",
                    html: `<h2>You have 5 hours to confirm your email:</h2>
                    <a href="${url}">Link to verify</a>`
                })
            }
        );

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser, sendLink };