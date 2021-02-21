const express = require('express')
const app = express()
const cors = require('cors')
const Router = require('./router')



// middelware
app.use(cors())
app.use(express.json())

app.use('/api', Router)

app.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})




app.listen(5000, () => {
  console.log('server has started on port 5000')
})