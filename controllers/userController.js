const mongoose = require('mongoose');
const DB = require('./../config');
const User = require('./../models/userModel');
const authSchema = require('../middlewares/auth');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

//CreateUser
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
        console.log(data)
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })

}

const validatePassword = async (req, res) => {
    const {username, password} = req.body;


    User.findOne({username : username}, (err, result)=>{
        if(err){
            console.log(err);
            res.send('err')
        }
        result.comparePassword(password,(err, isMatch) => {
            if(err){
                throw err;
                res.send(err)
            }
            console.log(isMatch);
            
            
            res.send(isMatch)
        })
    });

}


module.exports = {register, validatePassword}