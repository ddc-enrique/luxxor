const express = require('express')
const passport = require('passport')
const usersControllers = require('../controllers/usersControllers')
const productsControllers = require('../controllers/productsControllers')

const router = express.Router()

//rutas de usuarios
router.route('/user/sign-up')
    .post(usersControllers.signUp)
router.route('/user/sign-in')
    .post(usersControllers.signIn)
router.route('/user/edit-profile/:id')
    .post( passport.authenticate('jwt', {session: false}), usersControllers)
    .put( passport.authenticate('jwt', {session: false}), usersControllers)


//rutas de productos
router.route('/products')
    .get(productsControllers)
    .post(productsControllers)


module.exports = router