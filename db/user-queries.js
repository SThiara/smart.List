const db = require('./dbsetup');


const findUser = (id) => {
  // id = 1;
  return db.query(`
  SELECT name, email
  FROM users
  WHERE id = $1
  `, [id])
  .then((user) => {
    if (user){
      return user.rows[0];
    }
    return null;
  })
};

module.exports = {
  findUser
};
