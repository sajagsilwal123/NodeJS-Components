const nodemailer = require('nodemailer');
const template = require('./emailTemplate')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NM_EMAIL,
        pass: process.env.NM_PASSWORD
    }
});

const mailOptions = {
    from: process.env.NM_EMAIL,
    to: 'sajag.silwal123@gmail.com',
    subject: 'Verify Your Mail',
    html: template('www.instagram.com'),
}

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
        throw err
    } 
    console.log('Email sent: ' + info.response);
})