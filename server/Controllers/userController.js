const pool = require('../db')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const secret = 'This is our secret'

async function createUser(req, res) {
  try {
    const {
      username,
      password
    } = req.body
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES($1, $2) RETURNING username, password',
      [username, hash]
    )
    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function loginUser(req, res) {
  try {
    const {
      username,
      password
    } = req.body
    const user = await pool.query(
      'SELECT * FROM users WHERE username=($1)',
      [username]
    )
    const test = await bcrypt.compare(password, user.rows[0].password)
    console.log(test)
    const token = jwt.sign({
      sub: user.rows[0].id
    },
    secret, {
      expiresIn: '12h'
    }
    )
    const response = {
      user: user.rows[0].username,
      token: token
    }
    res.json(response)
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function getUsers(req, res) {
  try {
    const users = await pool.query(
      'SELECT user_id, username, email FROM users'
    )
    res.json(users.rows)
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function getUser(req, res) {
  const userId = req.params.userId
  try {
    const users = await pool.query(
      'SELECT user_id, username, email FROM users WHERE user_id=($1)',
      [userId]
    )
    res.json(users.rows)
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function updateUser(req, res) {
  const { username, email } = req.body
  const userId = req.params.userId
  try {
    const userDb = await pool.query(
      'UPDATE users SET username=($1), email=($2) WHERE user_id=($3) RETURNING username, email',
      [username, email, userId]
    )
    res.json(userDb.rows)

  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser
}