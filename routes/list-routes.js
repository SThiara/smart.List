/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { listByCategory } = require('../db/list-queries');

module.exports = () => {

  // Get /lists/
  router.get("/", (req, res) => {
    let id = 2;
    const categories=['eat','buy']; // ['eat', 'buy', 'read', 'watch']
    let categoriesPromise = [];

    // puts all the query calls by categories and resolve all the promises together
    for( let category of categories) {
      categoriesPromise.push(listByCategory(category));
    }
    Promise.all(categoriesPromise)
        .then(data => {
          res.json(data)
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST /lists/
  router.post("/", (req,res) => {
    let id = 2;
    let query = `INSERT INTO list_items(name, user_id, category)
    VALUES ($1, $2, $3)`
    db.query(query, ['Leftovers', id, 'eat'])
    res.send(200);
  });
  return router;
};
