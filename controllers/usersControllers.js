const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false }
})

const handleError = (res, err) =>{
    // console.log(err.message)
    res.json({success: false, response: err.message})
}

const usersControllers = {
    signUp: (req, res) =>{
        console.log("Received Register User Petition:" + Date())
        const { firstName, lastName, eMail, password, profilePic, google } = req.body
       
        let hashedPass = bcryptjs.hashSync(password.trim())
        const adminUser = [ process.env.ADMIN1 ]
        let admin = adminUser.includes(eMail)
        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password : hashedPass,
            eMail: eMail.trim(),
            profilePic: profilePic.trim(),
            google,
            admin
        })
        let options = {
            from: 'Luxxor <luxxor.tech@gmail.com>',
            to: eMail,
            subject: `Welcome to Luxxor ${lastName}, ${firstName}!`,
            /* html: `<h1 style="color: violet%;">Bienvenido ${firstName} a Luxxor <h1> <a href="http://localhost:4000/api/user/verificate-account/${newUser._id}"><button>Valida Cuenta<button></a>`, */
            html: `<h1 style="color: violet;">Bienvenido ${firstName} a Luxxor <h1> <a href="http://localhost:3000/"><button>Valida Cuenta<button></a>`,
        }
        User.findOne({ eMail })
            .then( (userFound) => {
                if(userFound) throw new Error("Usuario ya registrado")
                newUser.save()
                    .then( (user) => {
                        const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
                        transport.sendMail(options, (err, info) => {
                            if (err) throw new Error(err)
                            res.json({success: true, response: {profilePic: user.profilePic, firstName: user.firstName, lastName: user.lastName, eMail: user.eMail, token: token, admin: user.admin, _id:user._id}, responseMail: info})
                    })
                 })
            })
            .catch( err => handleError(res, err) )
    },

    signIn: (req, res) => {
        console.log("Received SIGN IN USER Petition:" + Date())
        const { eMail, password, google } = req.body
        const errMessage = "Email y/o contraseña incorrectos"
        User.findOne({ eMail })
            .then( (userFound) => {
                if (!userFound) throw new Error (errMessage)
                if (!google && userFound.google) throw new Error ("Por favor usar Google")
                if (!userFound.validated) throw new Error("Verifique la cuenta via su email")
                if (!bcryptjs.compareSync(password, userFound.password)) throw new Error(errMessage)
                const token = jwt.sign({...userFound}, process.env.SECRETORKEY)
                res.json({success: true, response: {profilePic: userFound.profilePic, firstName: userFound.firstName, lastName: userFound.lastName, eMail: userFound.eMail, token: token, admin: userFound.admin, _id: userFound._id}})
            })
            .catch( err => handleError(res, err) )
    },

    completeProfile: (req, res) => {
        console.log("Received COMPLETE DATA USER FIRST TIME Petition:" + Date())
        // const { firstName, lastName, dni, address, phone } = req.body
        // const { city, zipCode, street, optional } = address
        User.findOne({ dni: req.body.dni })
            .then( (userFound) => {
                if (userFound) throw new Error ("DNI en uso")
                User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
                    .then( (userUpdated) => {
                        res.json({ success: true, response: { firstName: userUpdated.firstName, lastName: userUpdated.lastName } })
                    } )
            })
            .catch( err => handleError(res, err) )
    },

    editProfile: (req, res) => {
        console.log("Received EDIT DATA USER Petition:" + Date())

        User.findOneAndUpdate({ _id: req.params.id }, {...req.body}, { new: true })
            .then( (userUpdated) => res.json({ success: true, response: { firstName: userUpdated.firstName, lastName: userUpdated.lastName } }) )
            .catch( err => handleError(res, err) )
    },

    verificateUser:(req,res)=>{
        console.log("Received VERIFICATE USER Petition:" + Date())
        const _id = req.params.id
        User.findOneAndUpdate({_id},{$set:{"validated":true}},{new:true})
        .then(userFound=>{
            if(!userFound) throw new Error("Usuario no encontrado")
            res.json({ success: true, response: userFound })
        })
        .catch(err => handleError(res, err))
    }



}

module.exports = usersControllers