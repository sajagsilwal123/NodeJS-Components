const express = require('express');
const { isError } = require('joi');
const router = express.Router();
const User = require('../models/userModel');
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.post('/register', userController.register)

//register
.post('/verify', userController.validatePassword)

module.exports = router;
