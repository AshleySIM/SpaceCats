const {
    fetchBookmarks,
    createBookmark,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
const { deleteBookmark } = require('../db/bookmarks');
  
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
      res.send(await createBookmark(req.user.id, req.body.product_id));
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/:id', isLoggedIn, async(req, res, next)=> {
    console.log(req.params.id)
    try {
      await deleteBookmark(req.params.id);
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
  
  
  module.exports = app;
  