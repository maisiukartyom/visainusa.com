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

        if (!isAdmin){
            await axios.put(
                'https://api.chatengine.io/users/',
                {
                    "username": email,
                    "secret": email,
                    "email": email
                },
                {headers: {"Private-Key": process.env.CHAT_SECRET}})
        }
        
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
                    return res.status(200).json({email: user.email, level: user.level, name: user.fullname, isAdmin: user.isAdmin})
                }
                
                if (forAdmin && !data.isAdmin){
                    return res.sendStatus(403)
                }
                else if (forAdmin && data.isAdmin){
                    return res.sendStatus(200);
                }

                if (data.level >= requiredLevel){
                    return res.status(200).json({email: user.email, level: user.level, name: user.fullname, isAdmin: user.isAdmin})
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

module.exports = { handleLogin, userVerification, handleLogout };