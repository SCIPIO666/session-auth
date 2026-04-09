const db=require('./index')
const logger=require('../utils/logger')
const findUserByUsername = async (username) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0] || null;
};

const findUserById = async (id) => {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
};

const createUser = async (username, hashedPassword) => {
  const { rows } = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedPassword]
  );
  return rows[0];
};

module.exports = { findUserByUsername, findUserById, createUser };