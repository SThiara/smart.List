const db = require('./dbsetup');


const findUser = (id) => {
  return db.query(`
  SELECT name, email, avatar
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

//updates user email, password and name in the database
const updateUserProfile = (userObject) => {
  const vars = [];
  let query = `UPDATE users SET `
  if (userObject.avatar) {
    vars.push(userObject.avatar);
    query += `avatar = $${vars.length}\n`;
  }
  if (userObject.email) {
    vars.push(userObject.email);
    query += `email = $${vars.length}\n`;
  }
  if (userObject.name) {
    vars.push(userObject.name);
    query += `name = $${vars.length}\n`;
  }
  if (userObject.password) {
    vars.push(userObject.password);
    query += `password = $${vars.length}\n`;
  }
  const queryPartial = query.split('\n');
  queryPartial.pop();
  query = queryPartial.join(', ');

  if (!vars.length) {
    return;
  }
  vars.push(userObject.id);
  query += `WHERE id = $${vars.length}
  RETURNING *`
  return db.query(query, vars)
  .then((user) => {
    if (user){
      return user.rows[0];
    }
    return null;
  })
};

module.exports = {
  findUser,
  updateUserProfile
};
