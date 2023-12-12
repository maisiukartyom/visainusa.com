const User = require('../model/User');
const axios = require('axios')

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const updateUser = async (req, res) => {
    try{
        const {email, level} = req.body
        await User.findOneAndUpdate({email: email}, {level: level});
        res.sendStatus(200);
    }
    catch(err){
        res.status(403).json({ 'message': `Couldn't update user ${email}` })
    }
}

const deleteUser = async (req, res) => {
    const {email} = req.body;
    try{
        await User.deleteOne({email: email});
    
        res.sendStatus(200);
    }
    catch(err){
        console.log(err)
        res.sendStatus(403)
    }


}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}