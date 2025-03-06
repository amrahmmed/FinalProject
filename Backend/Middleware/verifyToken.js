const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }


    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); 
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded; 
        console.log(req.user);
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

module.exports = verifyToken;
