const jwt = require('jsonwebtoken')
const pool = require('../db')
const secret = process.env.SECRET

async function secureRoute(req, res, next){
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')){
    return res.status(401).send({
      message: 'No token'
    })
  }

  const token = authToken.replace('Bearer ', '')

  const userId = await jwt.verify(token, secret, (err, payload) => {

    if (err) return res.status(401).send({
      message: 'Unauthorized Outdated'
    })

    return payload.sub
  })
  try {
    const user = await pool.query(
      'SELECT user_id, username, email FROM users WHERE user_id=($1)',
      [userId]
    )
    req.currentUser = user.rows[0]
    next()
  } catch (err) {
    res.json(err.message)
  }
  
}