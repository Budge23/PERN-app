// const express = require('express')
// const app = express()
// const cors = require('cors')
const pool = require('./db')

// app.listen(5000, () => {
//   console.log('server has started on port 5000')
// })

async function seed(){

  await pool.query('DROP TABLE USERS')
  
  await pool.query(`CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    password VARCHAR(30),
    email VARCHAR(225),
    email_verified BOOLEAN,
    date_created DATE,
    last_login DATE
  )`)

  const user1 = ['Theo', 'pass', 'theo@theo.com']

  await pool.query('INSERT INTO users (username, password, email, date_created) VALUES($1, $2, $3, NOW())', user1
  )
  
  const user2 = ['Lee', 'pass', 'lee@lee.com']

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

// const values = ['test', 'pass', 'test@test.com']

// pool.query('INSERT INTO users (username, password, email, date_created) VALUES($1, $2, $3, NOW())', values
// )