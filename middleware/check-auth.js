// authorization

const jwt = require('jsonwebtoken');
const config = require('../config');

const authorization = function (req, res, next) {
    const token = req.headers['access-token'];
    if(token){
        jwt.verify(token, config.SECRET, (error, decoded) => {
            if (error) {
                return res.status(500).json({ message: 'invalid token' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        })
    } else {
        res.status(500).json({ auth: false, message: `No token provided.` });
    }
}

module.exports = authorization;