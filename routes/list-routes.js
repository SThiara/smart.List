/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { listByCategory, addItem } = require('../db/list-queries');

module.exports = () => {

  // Get /lists/
  router.get("/", (req, res) => {
    let id = 2;
    const categories=['eat', 'buy', 'read', 'watch'];
    let categoriesPromise = [];

    // puts all the query calls by categories and resolve all the promises together
    for( let category of categories) {
      categoriesPromise.push(listByCategory(category, req.session.id));
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
  router.post("/", (req, res) => {
    let id = req.session.id;
    let category = 'eat';
    addItem(req.body.text, id, category)
    .then((todoItem) => {
      res.send(todoItem)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
