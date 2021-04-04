/*
 * All routes for List Items are defined here
 * Since this file is loaded in server.js into api/list_items,
 *   these routes are mounted onto /list_items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT name FROM list_items
//     WHERE category = 'watch'`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const items = data.rows;
//         res.json({ items });
//       })
//       .catch(err => {
//         console.log('error', err);
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT name, category FROM list_items
    WHERE category = 'watch'`;
    db.query(query)
      .then(data => {
        const items = data.rows;
        const templateVars = { items }
        res.render('dbtest', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// app.get('/urls', (req, res) => {
//   const templateVars = { urls: urlDatabase, user: users[req.session.user_id] };
//   if (templateVars.user) {
//     templateVars.urls = urlsForUser(templateVars.user['id'], urlDatabase); // returns urls that match user id
//   }
//   res.render('urls_index', templateVars);
// });
