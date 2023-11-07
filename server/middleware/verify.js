const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyPayment = async (req, res, next) => {
    const token = req.cookies.jwt;
    const {level} = req.body;

    jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, data) => {
        if (err) {
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
          return res.sendStatus(403);
        }

        const user = await User.findOne({email: data.email})
            if (user) {
              if (data.level >= level){
                return res.sendStatus(401)
              }
                else{
                    req.level = level
                    next()
                }
            }
            else{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(403);
            } 
        }
    );
}

module.exports = verifyPayment