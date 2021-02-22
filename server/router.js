const express = require('express')
const router = express.Router()
const userController = require('./Controllers/userController')
const calController = require('./Controllers/calController')

router.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser)

router.route('/cals')
  .post(calController.createCal)

router.route('/users/:userId')
  .get(userController.getUser)
  .put(userController.updateUser)

router.route('/login')
  .post(userController.loginUser)

module.exports = router