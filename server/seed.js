// const express = require('express')
// const app = express()
// const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcryptjs')

// app.listen(5000, () => {
//   console.log('server has started on port 5000')
// })

async function seed(){

  await pool.query('DROP TABLE USERS')
  
  await pool.query(`CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    password VARCHAR(225),
    email VARCHAR(225),
    email_verified BOOLEAN,
    date_created DATE,
    last_login DATE
  )`)

  const password = 'pass'
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  const user1 = ['Theo', hash, 'theo@theo.com']

  await pool.query('INSERT INTO users (username, password, email, date_created) VALUES($1, $2, $3, NOW())', user1
  )
  
  const user2 = ['Lee', hash, 'lee@lee.com']

  await pool.query('INSERT INTO users (username, password, email, date_created) VALUES($1, $2, $3, NOW())', user2
  )
  pool.end()
}

seed()

// app.close((err) => {
//   if (err) {
//     return console.error(err.message)
//   }
//   console.log('Closed the database connection.')
// })
