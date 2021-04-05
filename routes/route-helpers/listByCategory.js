const listByCategory = (category) => {
  router.get("/", (req, res) => {
    let query = `SELECT name, category FROM list_items
    WHERE category = $1
    ORDER BY name`;
    db.query(query, [category])
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
}

// AND user_id = $2

// /**
//  * Get a single user from the database given their id.
//  * @param {string} id The id of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
//  const getUserWithId = function(id) {
//   return Promise.resolve(pool.query(`
//   SELECT * FROM users
//   WHERE id = $1;
//   `, [id])
//   .then(res => {
//     if (res.rows.length === 0) {
//       return null;
//     }
//     return res.rows[0];
//   }))
// }
// exports.getUserWithId = getUserWithId;
