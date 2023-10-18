const {
    fetchReviews,
    createReview,
  } = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
    try {
      res.send(await fetchReviews());
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/reviews', isLoggedIn, async(req, res, next)=> {
    console.log(req.body);
    try {
      res.send(await createReview(req.body));
      
    }
    catch(ex){
      next(ex);
    }
  });


  module.exports = app;