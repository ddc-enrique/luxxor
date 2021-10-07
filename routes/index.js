const express = require('express')
const passport = require('passport')
const usersControllers = require('../controllers/usersControllers')
const productsControllers = require('../controllers/productsControllers')
const brandCategoryControllers= require('../controllers/brandCategoryControllers')
const validatorControllers = require('../controllers/validatorControllers')

const router = express.Router()

router.route('/user/sign-up')
    .post(validatorControllers.validatorSignUp, usersControllers.signUp)
router.route('/user/sign-in')
    .post(validatorControllers.validatorSignIn, usersControllers.signIn)

router.route('/pruebaMail')
    .post(usersControllers.pruebaMail)    

router.route('/user/cambio-contrasenia/:id')
    .put(usersControllers.changePassword)
    
router.route('/user/edit-profile/:id')
    .get( passport.authenticate('jwt', {session: false}), 
        usersControllers.getProfile)
    .post( passport.authenticate('jwt', {session: false}), 
        validatorControllers.validatorEditComplete, 
        usersControllers.completeProfile)
    .put( passport.authenticate('jwt', {session: false}), 
        validatorControllers.validatorEditComplete, 
        usersControllers.editProfile)

router.route("/verifyToken")
    .get(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyToken)

router.route('/products')
    .get(productsControllers.getAllProducts)
    .post(productsControllers.addProduct)

router.route('/product/:id')
    .get(productsControllers.getOneProduct)
    .put(productsControllers.editProduct)
    .delete(productsControllers.deleteProduct)

router.route('/admin/brands')
    .get(brandCategoryControllers.getAll)
    .post(brandCategoryControllers.addValueField)
    
router.route('/admin/brand/:id')
    .get(brandCategoryControllers.getOneValueField)
    .put(brandCategoryControllers.editValueField)
    .delete(brandCategoryControllers.deleteValueField)

router.route('/admin/categories')
    .get(brandCategoryControllers.getAll)
    .post(brandCategoryControllers.addValueField)

router.route('/admin/category/:id')
    .get(brandCategoryControllers.getOneValueField)
    .put(brandCategoryControllers.editValueField)
    .delete(brandCategoryControllers.deleteValueField)



module.exports = router