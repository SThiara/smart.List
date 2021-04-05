const db = require('./dbsetup');

const listByCategory = (category) => {
    let query = `SELECT name, category FROM list_items
    WHERE category = $1
    ORDER BY name`;
    return db.query(query, [category])
      .then(data => {
        const items = data.rows;
        console.log(items);
        return items;
      })
      .catch(err => {
        res
          .status(500)
          .console.log({ error: err.message });
      });
}

listByCategory('watch');

module.exports = {
  listByCategory
}
