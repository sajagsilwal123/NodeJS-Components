const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
// const createUser = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.post('/', (req, res, next)=>{
  User.create(req.body)
    .then((data) => {
      res.status(200);
      res.setHeader('Content-Type','application/json');
      res.json(data)
    })
    .catch((err)=>{
      res.status(401);
      res.send(err);
      console.error(err)
    })

})

module.exports = router;
