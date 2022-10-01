const mongoose = require('mongoose');
const DB = require('./../config');
const User = require('./../models/userModel');
const authSchema = require('../middlewares/auth');
const createError = require('http-errors');


//CreateUSer
const register = async (req, res, next) => {
    const result = await authSchema.validateAsync(req.body)
    const existEmail = await User.findOne({ email : result.email});
    const existUsername = await User.findOne({ username: result.username });

    if (existEmail || existUsername){
        if(existEmail){
            const err = createError.Conflict(`${result.email} already exists!!`);
            res.send(err)
            throw err;            
        }
        if(existUsername){
            const err = createError.Conflict(`${result.username} already exists!!`);
            res.send(err)
            throw err;         
        }
    }

    User.create(result)
    .then((data) => {
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })

}


module.exports = {register}