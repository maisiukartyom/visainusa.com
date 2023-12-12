const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios')

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email: email }).exec();

    
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        const isAdmin = foundUser.isAdmin;

        if (!foundUser.confirmed && !isAdmin) return res.sendStatus(402);

        const level = foundUser.level;
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "email": foundUser.email,
                "isAdmin": isAdmin,
                "level": level
             },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        await foundUser.save();

        // if (!isAdmin){
        //     await axios.put(
        //         'https://api.chatengine.io/users/',
        //         {
        //             "username": email,
        //             "secret": email,
        //             "email": email
        //         },
        //         {headers: {"Private-Key": process.env.CHAT_SECRET}})
        // }
        
        // Creates Secure Cookie with access token
        res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        
        res.sendStatus(200); 
        // Send authorization roles and access token to user
        //res.json({ isAdmin, accessToken, level });

    } else {
        res.sendStatus(401);
    }
}

const handleLogout = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200);
}

const userVerification = (req, res) => {
    const token = req.cookies.jwt
    const {requiredLevel, forAdmin} = req.body

    if (!token) {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(403);
        } else {
            const user = await User.findOne({email: data.email})
            if (user) {

                if (user.isAdmin){
                    return res.status(200).json({email: user.email, 
                        level: user.level, 
                        name: user.fullname, 
                        isAdmin: user.isAdmin,
                        phoneNumber: user.phoneNumber
                        })
                }
                
                if (forAdmin && !data.isAdmin){
                    return res.sendStatus(403)
                }
                else if (forAdmin && data.isAdmin){
                    return res.sendStatus(200);
                }

                if (user.level >= requiredLevel){
                    return res.status(200).json({email: user.email, 
                        level: user.level, 
                        name: user.fullname, 
                        isAdmin: user.isAdmin,
                        phoneNumber: user.phoneNumber})
                }
                else{
                    return res.sendStatus(403)
                }
            }
            else{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(403);
            } 

        }
    })
}

const confirmEmail = async (req, res) => {
    try{
        const {email} = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await User.findOneAndUpdate({email: email}, {confirmed: true})
    }
    catch{
        res.sendStatus(404);
    }

    return res.redirect(`${process.env.URL_CLIENT}/login`)
}

const setPassword = async (req, res) => {
    try{
        const {token, password} = req.body;
        jwt.verify(token, process.env.EMAIL_SECRET, async(err, data) => {
            if (err){
                return res.sendStatus(403);
            }
            const newPassword = await bcrypt.hash(password, 10);
            await User.findOneAndUpdate({email: data.email}, {password: newPassword});
            res.sendStatus(201);
        })
    }
    catch(err){
        res.sendStatus(405);
    }
}

const confirmReset = async (req, res) => {
    try{
        jwt.verify(req.params.token, process.env.EMAIL_SECRET, async (err, data) => {
            if (err){
                return res.sendStatus(401);
            }

            return res.redirect(`${process.env.URL_CLIENT}/resetPassword/${req.params.token}`);
        });
        
    }
    catch(err){
        return res.sendStatus(402);
    }
}

module.exports = { handleLogin, userVerification, handleLogout, confirmEmail, setPassword, confirmReset };