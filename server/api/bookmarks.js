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

  app.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await createBookmark(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
  
  module.exports = app;
  