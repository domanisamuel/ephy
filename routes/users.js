// routes

const router = require('express').Router();

// import user controller
const userController = require('../controllers/users');

// user routes
router.route('/users')
    .post(userController.create)
    .get(userController.findAll)
router.route('/users/:id')
    .get(userController.findOne)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.delete)
router.route('/signup')
    .post(userController.create)
router.route('/login')
    .post(userController.login)

// export user routes
module.exports = router;