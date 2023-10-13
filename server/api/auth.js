const {
  authenticate,
  findUserByToken
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const {createUser}= require('../db/auth')


app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});


app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});

app.post('/users', async(req, res, next)=> {
  try {
    
    const user = req.body.user
    console.log(user)
    res.send(await createUser(user));
    
  }
  catch(ex){
    next(ex);
  }
});


module.exports = app;
