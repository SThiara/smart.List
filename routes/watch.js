const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT name, category FROM list_items
    WHERE category = 'watch'
    ORDER BY name`;
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
