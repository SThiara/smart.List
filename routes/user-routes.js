/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {findUser, updateUserProfile} = require('../db/user-queries')

module.exports = () => {
  // GET /user/edit
  router.get("/edit", (req, res) => {
    if (res.err){
      return res.redirect("/*");
    }
    findUser(req.session.id)
    .then( user => {
      const templateVars = {user}
      res.render("user_profile", templateVars);
    });
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  })

  // GET /user/*
  router.get("/*", (req, res) => {
    res.status(404).send('Error 404: Page not found!')
  });

  router.post('/login/:id',(req, res) => {
    req.session.id = req.params.id;
    res.redirect('/');
  });

  //POST user/:id
  router.post('/:id',(req, res) => {
    const userObj = req.body;
    userObj['id'] = req.session.id;
    updateUserProfile(userObj);
    res.redirect("/");
  });


  return router;
};
