const express = require('express')
const router = express.Router()
const userController = require('./Controllers/userController')
const calController = require('./Controllers/calController')
const secureRoute = require('./middleware/secureRoute')

router.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser)

router.route('/cals')
  .post(secureRoute, calController.createCal)

router.route('/cals/:calId')
  .put(secureRoute, calController.updateCal)
  .delete(secureRoute, calController.deleteCal)

router.route('/users/:userId')
  .get(userController.getUser)
  .put(secureRoute, userController.updateUser)

router.route('/login')
  .post(userController.loginUser)

module.exports = router