/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {findUser} = require('../db/user-queries')

module.exports = () => {
  router.get('/login/:id', (req, res) => {
    // if using cookie-session middleware
    req.session.id = req.params.id;
    res.redirect('/');
  });

  // GET /user:id
  router.get("/:id", (req, res) => {
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
  return router;
};
