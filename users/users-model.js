const db = require("../data/db.config");

function find() {
  return db("users").select();
}

function findByID(id) {
  return db("users")
    .limit(req.query.limit)
    .orderBy(req.query.orderBy)
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findByID,
  add,
  remove
};
