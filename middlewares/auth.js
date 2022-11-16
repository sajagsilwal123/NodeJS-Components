const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const TOKEN_KEY = process.env.JWT_KEY

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token)
        return res.status(403).json({success: false, message: 'No Tokens Entered'})
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        res.send(decoded)
    } catch (error) {
        res.send(error)
    }  
    return next()
}

module.exports = verifyToken;