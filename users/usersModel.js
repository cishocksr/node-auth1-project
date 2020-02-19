const db = require("../data/dbConfig.js");
const bcrypt = require('bcryptjs')


function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

async function add(user) {
  user.password = await bcrypt.hashSync(user.password, 11);
  const [id] = await db('users').insert(user);
  return findById(ids[0]);
}

function remove(id) {
  return db('users')
  .where({id})
  .del()
}

module.exports = {
    find,
    findBy,
    add,
    findById,
    remove
  };