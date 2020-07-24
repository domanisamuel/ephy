// routes

const router = require('express').Router();
const userController = require('../controllers/users'); // import user controller
const Authorization = require('../middleware/check-auth') // check auth

// user routes
router.route('/users')
    .post(Authorization, userController.create)
    .get(Authorization, userController.findAll)
router.route('/users/:id')
    .get(Authorization, userController.findOne)
    .put(Authorization, userController.update)
    .patch(Authorization, userController.update)
    .delete(Authorization, userController.delete)
router.route('/search/users')
    .get(userController.searchUsers)
router.route('/signup')
    .post(userController.create)
router.route('/login')
    .post(userController.login)

// export user routes
module.exports = router;