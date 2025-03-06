const  jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models.js');
require('dotenv').config();

const login = async(req, res) =>{
    const {email,password}= req.body    
    
    
    res.json
    try{

        const user = await User.findOne({email});
        if(user && bcrypt.compareSync(password, user.password)){
            const accessToken = jwt.sign(
                { id: user._id, role: user.role },  
                process.env.ACCESS_TOKEN      
            );
            return res.json({
                token: accessToken,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                }
            });

        }else{
            return res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).send(error.message);
    }
};


module.exports = login