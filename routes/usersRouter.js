const express = require('express');
const { isError } = require('joi');
const router = express.Router();
const User = require('../models/userModel');
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.post('/register', (req, res, next)=>{
  User.create(req.body)
    .then((data) => {
      res.status(200);
      res.setHeader('Content-Type','application/json');
      res.json(data)
    })
    .catch((err)=>{
      res.status(401);
      res.send(err)
      // res.setHeader('Content-Type', 'text/json')
      // res.json(err)
      console.error(err)
    })

})

//register
.post('/verify', userController.validatePassword)

module.exports = router;
