const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcryptjs')


// middelware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

// Routes
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES($1, $2) RETURNING username, password',
      [username, hash]
    )
    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})



app.listen(5000, () => {
  console.log('server has started on port 5000')
})