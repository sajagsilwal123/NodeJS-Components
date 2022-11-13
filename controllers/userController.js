const mongoose = require('mongoose');
const DB = require('./../config');
const User = require('./../models/userModel');
const authSchema = require('../middlewares/auth');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

//CreateUser
const register = async (req, res) => {
    const result = await authSchema.validateAsync(req.body)
    const emailRecord = await User.findOne({ email : result.email});

    if(emailRecord){
        return res.status(409).json({success:false,message:`${result.email} already exists!!`})
    } 

    const usernameRecord = await User.findOne({ username: result.username });

    if(usernameRecord){
        return res.status(409).json({success:false,message:`${result.username} already exists!!`})
    } 

    const emailToken = jwt.sign({email:result.email,pinCode:'1234'},'b0ea7165dbf6a02f89ac24e2facc3646244e29aa',{expiresIn:'10s'})
    
    const userObj = new User({...result,emailToken});


    const executeInsertion = await userObj.save();

    if(executeInsertion)  return res.status(200).json({success:false,message:`${result.username} Created`,data:{user:executeInsertion}})
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

const verifyEmail = async(req,res) => {
  // User requests
  const email = req.query.email;

  const isValidEmail = validator.isEmail(email);
  
  if(!isValidEmail) return res.status(400).json({success:false,message:'Invalid email address!'});

  // Check the user record for given email
  const userRecord = await User.findOne({email});

  if(!userRecord) return res.status(404).json({success:false,message:'Cannot find user record. Please contact support.practice!'});

  if(!userRecord.emailToken) return res.status(403).json({success:false,message:'Corrupted token! Please request new one!'})
  
}


module.exports = {register, validatePassword}