const express = require('express');
const router  = express.Router();
const { listByCategory } = require('../db/list-queries');

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT name, category FROM list_items
//     WHERE category = 'buy'
//     ORDER BY name`;
//     db.query(query)
//       .then(data => {
//         const items = data.rows;
//         const templateVars = { items }
//         res.render('dbtest', templateVars);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   return router;

// };

router.get('/', (req, res) => {
  listByCategory('buy')
    .then((items) => {
      const templateVars = { items }
      res.render('dbtest', templateVars);
    })
})

module.exports = router;
