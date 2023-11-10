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
        
        const userTmp = await axios.put(
            'https://api.chatengine.io/users/',
            {
                "username": email,
                "secret": email,
                "email": email
            },
            {headers: {"Private-Key": process.env.CHAT_SECRET}}
        )

        const chatTmp = await axios.put(
            'https://api.chatengine.io/chats/',
            {
                "usernames": ["Alexey", email],
                "is_direct_chat": true
            },
            {headers: {"Private-Key": process.env.CHAT_SECRET}}
        )
        
        await axios.delete(
            `https://api.chatengine.io/chats/${chatTmp.data.id}/`,
            {headers: {
                "Project-ID": process.env.CHAT_PROJECT_ID,
                "User-Name": userTmp.data.email,
                "User-Secret": userTmp.data.email
            }}
        )

        await axios.delete(
            `https://api.chatengine.io/users/${userTmp.data.id}`,
            {headers: {"Private-Key": process.env.CHAT_SECRET}})
    
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