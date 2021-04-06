const db = require('./dbsetup');

const listByCategory = (category) => {
  let query = `SELECT name, category FROM list_items
    WHERE category = $1
    ORDER BY name`;
  return db.query(query, [category])
    .then(data => {
      const items = data.rows;
      return items;
    })
    .catch(err => {
        .status(500)
        .console.log({ error: err.message });
    });
};

const addItem = (name, userId, category) => {
  return db.query(`
  INSERT INTO list_items (name, user_id, category)
  VALUES ($1, $2, $3)
  RETURNING *`, [name, userId, category])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      const items = res.rows[0];
      return items;
    });
};

listByCategory('watch');

module.exports = {
  listByCategory,
  addItem
};
