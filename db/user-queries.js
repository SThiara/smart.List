const db = require('./dbsetup');


const findUser = (id) => {
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

const updateUserEmail = (email, user_id) => {
  return db.query(`
  UPDATE users
  SET email = $1
  WHERE id = $2
  RETURNING *`, [email, user_id])
  .then((user) => {
    if (user){
      return user.rows[0];
    }
    return null;
  })
};

module.exports = {
  findUser,
  updateUserEmail
};
