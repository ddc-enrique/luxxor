const express = require('express')
const passport = require('passport')
const usersControllers = require('../controllers/usersControllers')
const productsControllers = require('../controllers/productsControllers')
const brandCategoryControllers= require('../controllers/brandCategoryControllers')
const validatorControllers = require('../controllers/validatorControllers')
const messagesControllers = require('../controllers/messagesControllers')
const salesControllers = require('../controllers/salesControllers')

const router = express.Router()

router.route('/user/sign-up')
    .post(validatorControllers.validatorSignUp, usersControllers.signUp)
router.route('/user/sign-in')
    .post(validatorControllers.validatorSignIn, usersControllers.signIn)

/* router.route('/pruebaMail')
    .post(usersControllers.pruebaMail)     */
router.route('/user/bann-user/:id')
    .put(usersControllers.banUser)

router.route('/user/change-password')
    .put(usersControllers.changePassword)

router.route('/user/mail-password')
    .post(usersControllers.sendMailPassword)

router.route('/user/verifyId/:id')
    .get(usersControllers.getProfile)

router.route('/user/verify-mail/:id')
    .get(usersControllers.getProfile)
    
router.route('/user/edit-profile/:id')
    .get( passport.authenticate('jwt', {session: false}), 
        usersControllers.getProfile)
    .post( passport.authenticate('jwt', {session: false}), 
        validatorControllers.validatorEditComplete, 
        usersControllers.completeProfile)
    .put( passport.authenticate('jwt', {session: false}), 
        validatorControllers.validatorEditComplete, 
        usersControllers.editProfile)

router.route("/user/wish/:id")
    .put(usersControllers.addWish)
    
router.route("/user/myshopping/:id")
    .get(salesControllers.getOneSale)

router.route("/verifyToken")
    .get(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyToken)

router.route('/products')
    .get(productsControllers.getAllProducts)
    .post(
        // passport.authenticate("jwt", { session: false }),
        // usersControllers.verifyAdmin,
        productsControllers.addProduct)

router.route('/product/:id')
    .get(productsControllers.getOneProduct)
    .put(
        // passport.authenticate("jwt", { session: false }),
        // usersControllers.verifyAdmin,
        productsControllers.editProduct)
    .delete(
        // passport.authenticate("jwt", { session: false }),
        // usersControllers.verifyAdmin,
        productsControllers.deleteProduct)

router.route('/checkout')
    .post(productsControllers.productOnCart)
    
router.route('/admin/brands')
    .get(brandCategoryControllers.getAll)
    .post(
        // passport.authenticate("jwt", { session: false }),
        // usersControllers.verifyAdmin,
        brandCategoryControllers.addValueField)
    
router.route('/admin/brand/:id')
    .get(brandCategoryControllers.getOneValueField)
    .put(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        brandCategoryControllers.editValueField)
    .delete(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        brandCategoryControllers.deleteValueField)

router.route('/admin/categories')
    .get(brandCategoryControllers.getAll)
    .post(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        brandCategoryControllers.addValueField)

router.route('/admin/category/:id')
    .get(brandCategoryControllers.getOneValueField)
    .put(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        brandCategoryControllers.editValueField)
    .delete(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        brandCategoryControllers.deleteValueField)

router.route('/admin/messages')
    .get(messagesControllers.getAllMessages)
router.route('/admin/message/:id')
    .delete(passport.authenticate("jwt", { session: false }),
        usersControllers.verifyAdmin,
        messagesControllers.deleteMessage)

router.route('/contact')
    .post(validatorControllers.validatorSendNewMessage,
        messagesControllers.sendNewMessage)

router.route('/verify-admin')
        .get(passport.authenticate('jwt', {session: false}), 
        usersControllers.verifyAdmin)

router.route('/sales')
    .get(/* passport.authenticate('jwt', {session: false}),  
        usersControllers.verifyAdmin,    */
    salesControllers.getAllSales)
    .post(passport.authenticate('jwt', {session: false}), 
    salesControllers.saveNewSale)

module.exports = router