/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    // GET /user:id
    router.get("/:id", (req,res) => {
      if (res.err){
        return res.redirect("/*");
      }
      const user = {'name': req.body.name, 'email':req.body.email, 'password':req.body.password};
      let templateVars = {user}
      res.render(user_profile.ejs, templateVars);
    });


  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // GET /user/*
  router.get("/*", (req, res) => {
    res.status(404).send('Error 404: Page not found!')
  });

  router.post('/login',(req, res) => {
    res.redirect("/lists/")
  });
  return router;
};
