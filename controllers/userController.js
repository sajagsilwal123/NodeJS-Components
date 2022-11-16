const mongoose = require('mongoose');
const DB = require('./../config');
const User = require('./../models/userModel');
const authSchema = require('../helper/userCredentialsValidator');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const TOKEN_KEY = process.env.JWT_KEY

//CreateUser
const register = async (req, res) => {
    const result = await authSchema.validateAsync(req.body)
    const emailRecord = await User.findOne({ email : result.email});
    const salt = await bcrypt.genSalt(15);
    const password = result.password.toString()


    if(emailRecord){
        return res.status(409).json({success:false,message:`${result.email} already exists!!`})
    } 

    const usernameRecord = await User.findOne({ username: result.username });

    if(usernameRecord){
        return res.status(409).json({success:false,message:`${result.username} already exists!!`})
    } 

    const emailToken = jwt.sign({email:result.email,pinCode:'1234'},TOKEN_KEY,{expiresIn:'100s'})
    
    result.password = await bcrypt.hash(password, salt)
    const userObj = new User({...result,emailToken});

    const executeInsertion = await userObj.save();

    if(executeInsertion){
        const userToken = jwt.sign({userId: executeInsertion._id, email: executeInsertion.email}, 'b0ea7165dbf6a02f89ac24e2f', {expiresIn:'2h'});
        userObj.userToken = userToken
        userObj.save()
        return next()
        //return res.status(200).json({success:true,message:`${result.username} Created`,data:{user:executeInsertion}})
    }  
}

const validatePassword = async (req, res, next) => {
    const {username, password} = req.body;

    User.findOne({username : username}, async (err, result)=>{
        if(err)
            throw err
        const isPasswordValid = await bcrypt.compare(password, result.password)
        if(isPasswordValid){
            const token = jwt.sign(
            {_id: result._id.valueOf(), username: username, email: result.email, pass:'12345'},
            'e373fe543211d666f2575ac7301f092e1639f0d8',
            {expiresIn:'1h'}
            )
            loginToken = token.toString();
        }
        User.findByIdAndUpdate(result._id,{userToken: loginToken}, (err, userData) => {
            if(err) throw err
            //res.status(200).json({success: true, message:`${result.username} logged in successfully!!`,data:{user: userData}})
        })
    });

    return next()
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