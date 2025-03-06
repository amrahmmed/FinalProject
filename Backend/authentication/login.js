const  jwt  = require('jsonwebtoken');
const {User} = require('../models.js');
require('dotenv').config();

const login = async(req, res) =>{
    const {email,password}= req.body    
    const accessToken = jwt.sign(user,process.env.accessToken);
    res.json
    try{

        const user = await User.findOne({email});
        if(user && user.password == password){
            res.json(user);

        }else{
            return res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).send(error.message);
    }
};


module.exports = login