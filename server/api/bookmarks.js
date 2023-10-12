const {
    fetchBookmarks,
    createBookmark,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await fetchBookmarks(req.user.id));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.put('/:id', isLoggedIn, (req, res, next)=> {
    res.send('hello world');
  });
  
  
  module.exports = app;
  