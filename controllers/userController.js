const mongoose = require('mongoose');
const DB = require('./../config');
const User = require('./../models/userModel');

//Dummy Data


//CreateUSer
var ans = {bool :false, data: "" }
const CreateUser = (req) => {
    User.create(req.body)
    .then((data, res) => {
        res.send(data)
    })
    .catch((err)=>{
        var ans = {bool :false, data: err }
    })
}

module.exports = CreateUser