const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/userModel');
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.post('/register', userController.register)

//login
.post('/getToken', userController.validatePassword, (req, res, next) => {
  res.status(200).send('DONE!!')
})
.post('/login', auth, (req, res, next)=>{
  res.status(200).send('HELLO')
}) 

module.exports = router;
