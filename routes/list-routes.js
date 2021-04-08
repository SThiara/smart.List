/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { listByCategory, addItem, changeCategory } = require('../db/list-queries');
const { makeAPICalls } = require('../lib/makeAPICalls');

module.exports = () => {

  // Get /lists/
  router.get("/", (req, res) => {
    const categories = ['eat', 'buy', 'read', 'watch'];
    let categoriesPromise = [];

    // puts all the query calls by categories and resolve all the promises together
    for (let category of categories) {
      categoriesPromise.push(listByCategory(category, req.session.id));
    }
    Promise.all(categoriesPromise)
      .then(data => {
        res.json(data);
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
    if (id) {
      makeAPICalls(req.body.text)
        .then((category) => {
          addItem(req.body.text, id, category);
        })
        .then(() => {
          res.send(200);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.sendStatus(403);
    }
  });

  // POST /lists/move
  router.post("/move", (req, res) => {
    changeCategory(req.body.category, req.body.id)
      .then(
        res.send(200)
      );
  });
  return router;
};
