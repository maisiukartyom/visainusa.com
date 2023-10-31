const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { fullname, email, password, phoneNumber } = req.body;
    console.log(req.body);
    if (!fullname || !email || !password || !phoneNumber) return res.status(400).json({ 'message': 'Email, password, fullname and phoneNumber are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
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

        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };