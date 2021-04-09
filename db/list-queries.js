const db = require('./dbsetup');

const listByCategory = (category, id) => {
  let query = `SELECT * FROM list_items
    WHERE category = $1
    AND user_id = $2
    ORDER BY name`;
  return db.query(query, [category, id])
    .then(data => {
      const items = data.rows;
      return items;
    })
    .catch(err => {
      console.log({ error: err.message });
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

const changeCategory = (category, id) => {
  return db.query(`
  UPDATE list_items
  SET category = $1
  WHERE id = $2
  RETURNING *
  `, [category, id])
    .then((item) => {
      return item.rows[0];
    });
};

const deleteItem = id => {
  return db.query(`
  UPDATE list_items
  SET deleted = TRUE
  WHERE id = $1
  RETURNING *
  `, [id])
    .then((item) => {
      return item.rows[0];
    });
};

module.exports = {
  listByCategory,
  addItem,
  changeCategory,
  deleteItem
};
