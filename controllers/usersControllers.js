const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transport = require('../config/transport')
const path = require("path")

const handleError = (res, err) =>{
    res.json({success: false, response: err.message})
}

const usersControllers = {
    signUp: (req, res) =>{
        console.log("Received Register User Petition:" + Date())
        const { firstName, lastName, eMail, password, google } = req.body
        route = path.join(__dirname, "../assets/usersPhoto")
        let hashedPass = bcryptjs.hashSync(password.trim())
        const adminUser = [ process.env.ADMIN1, process.env.MAIL, process.env.MAIL2 ]
        let admin = adminUser.includes(eMail)
        const newUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password : hashedPass,
            eMail: eMail.trim(),
            google,
            admin
        })
        if (req.files) {
            const {profilePic} = req.files
            let fileName = newUser.eMail + "." + profilePic.name.split(".")[req.files.profilePic.name.split.length-1]
                newUser.profilePic = fileName           
            profilePic.mv(`${route}/${fileName}`)
        }else{
            newUser.profilePic = req.body.profilePic
        }
        
        User.findOne({ eMail })
            .then( (userFound) => {
                if(userFound) throw new Error("Usuario ya registrado")
                newUser.save()
                    .then( (user) => {
                        const token = jwt.sign({...newUser}, process.env.SECRETORKEY) 
                        res.json({success: true, response: {profilePic: user.profilePic, google: user.google, firstName: user.firstName, lastName: user.lastName, eMail: user.eMail, token: token, admin: user.admin, _id:user._id}})                  
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
                if (userFound.banned) throw new Error("Cuenta bloqueada")
                if (!bcryptjs.compareSync(password, userFound.password)) throw new Error(errMessage)
                const token = jwt.sign({...userFound}, process.env.SECRETORKEY)
                res.json({success: true, response: {profilePic: userFound.profilePic, google: userFound.google, firstName: userFound.firstName, lastName: userFound.lastName, eMail: userFound.eMail, token: token, admin: userFound.admin, _id: userFound._id, dni:userFound.dni}})
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
                        res.json({ success: true, response: { dni: userUpdated.dni } })
                    } )
            })
            .catch( err => handleError(res, err) )
    },

    editProfile: (req, res) => {
        console.log("Received EDIT DATA USER Petition:" + Date())

        User.findOneAndUpdate({ _id: req.params.id }, {...req.body}, { new: true })
            .then( (userUpdated) => res.json({ success: true, response: { firstName: userUpdated.firstName, lastName: userUpdated.lastName} }) )
            .catch( err => handleError(res, err) )
    },

    banUser:(req,res)=>{
        console.log("Received BAN USER Petition:" + Date())
        const _id = req.params.id
        User.findById({_id})
        .then(userFound=>{
            if(!userFound) throw new Error("Usuario no encontrado")
            if(userFound.banned) throw new Error("Usuario ya bloqueado")
            let mailBanned = {
                from: 'Luxxor <luxxor.tech@gmail.com>',
                to: userFound.eMail,
                subject: `Cuenta Bloqueada-${userFound.firstName} ${userFound.lastName}`,
               
                 html: `
                <table style="max-width: 800px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <div style="width: 100%;margin:20px 0; text-align: center;">
                            <a href="http://localhost:3000/"><img src="https://i.postimg.cc/QxNK5h6Y/logo-Luxxor.png"" /></a>
                        </div>
                    <tr>
                        <td style="background-color: #dfdbdb;border-radius:20px;box-shadow: 0 5px 16px 0 #433e3e94">
                        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                            <h1 style="color: #7A5EA8; margin: 0 0 7px">Cuenta Bloqueada</h1>
                            <h2 style="color: #000; margin: 0 0 7px">¡Hola  ${userFound.firstName} ${userFound.lastName}!</h2>
                            <p style="margin: 2px; font-size: 15px; color: #000">
                                    Te enviamos este e-mail para comunicarle que su cuenta ha sido bloqueada!
                                    Puede comunicarse a esta casilla de correo para recuperarla.
                            </p>                    
                            <hr/>
                            <p style="color: #34495e; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                            
                        </td>
                    </tr>
                </table>
                    `
            }
            userFound.mailSentPassBan=false
            userFound.banned=true
            userFound.save()
            .then((userUpdated)=>{
                console.log("130",userUpdated)
                transport.sendMail(mailBanned, (err, info) => {
                    if (err) throw new Error(err)
                    res.json({ success: true, response: info })
                })
            })   
        })
        .catch(err => handleError(res, err))
    },

    changePassword:(req,res)=>{
        console.log("Received CHANGE PASSWORD Petition:" + Date())
        const {eMail,password} = req.body
        let hashedPass = bcryptjs.hashSync(password.trim())
        User.findOne({eMail})
        .then(userFound=>{
            if(!userFound) throw new Error("Usuario no registrado")
            let mailChangePassword = {
                from: 'Luxxor <luxxor.tech@gmail.com>',
                to: eMail,
                subject: `Cambio de contraseña realizado con exito ${userFound.lastName}, ${userFound.firstName}!`,
                html: `
                    <table style="max-width: 800px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                            <div style="width: 100%;margin:20px 0; text-align: center;">
                                <a href="http://localhost:3000/"><img src="https://i.postimg.cc/QxNK5h6Y/logo-Luxxor.png"" /></a>
                            </div>
                        <tr>
                            <td style="background-color: #dfdbdb;border-radius:20px;box-shadow: 0 5px 16px 0 #433e3e94">
                            <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                                <h1 style="color: #7A5EA8; margin: 0 0 7px">Cambio de Contraseña realizado con exito.</h1>
                                <h2 style="color: #000; margin: 0 0 7px">¡Hola ${userFound.lastName}, ${userFound.firstName}!</h2>
                                <p style="margin: 2px; font-size: 15px; color: #000">
                                        Te enviamos este e-mail para comunicarte que has cambiado tu contraseña con exito!
                                </p>
                                <h2 style="color:#e11919;">INFORMACION IMPORTANTE </h2>
                                <p style="margin: 2px; font-size: 15px; color: #000">
                                    Si tu no realizaste la solicitud de cambio de contraseña, haz click en el siguiente botón:
                                </p>
                                <a href="http://localhost:3000/bloqueo-cuenta/${userFound._id}"><button  style="background-color: #f48f31;color: white; border:none; padding:0.5rem 1rem">Bloquear Cuenta</button></a>
                                <hr/>
                                <p style="color: #34495e; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                                
                            </td>
                        </tr>
                    </table>
                        `               
            }
            userFound.password=hashedPass
            userFound.mailSentPassBan=true
            userFound.save()
            .then(userModified=>{
                transport.sendMail(mailChangePassword, (err, info) => {
                    if (err) throw new Error(err)
                    res.json({ success: true, response: info })
                })})
        })
        .catch(err => handleError(res, err))     
    },

    getProfile: (req,res) => {
        console.log("Received GET DATA USER Petition:" + Date())
        
        User.findById({_id:req.params.id})
        .then( userFound => {
            if( !userFound) throw new Error("No se encontro ningun usuario")
            if(req.url.includes("verifyId")){
                res.json({ success: true}) 
            }else if(req.url.includes("verify-mail")){
                if(!userFound.mailSentPassBan) throw new Error("Usuario sin acceso")
                res.json({ success: true}) 
            }
            else{
                res.json({ success: true, response: { address: userFound.address, city: userFound.city, zipCode: userFound.zipCode, optional: userFound.optional, phone: userFound.phone} } )
            }           
        })
        .catch( err => handleError(res, err) )
    },
    
    verifyToken: (req, res) => {
        const {profilePic, firstName, lastName, eMail, admin, dni, _id, google} = req.user
        res.json({profilePic, firstName, lastName, eMail, admin, dni, id: _id, google})
    },
    sendMailPassword:(req,res)=>{
        console.log("Received CHANGE PASSWORD Petition:" + Date())
        eMail=req.body.eMail
        User.findOne({eMail:eMail})
        .then(userFound=>{
            if( !userFound) throw new Error("No se encontro ningun usuario")
            let mail = {
                from: 'Luxxor <luxxor.tech@gmail.com>',
                to: eMail,
                subject: `Cambio de contraseña ${userFound.lastName}, ${userFound.firstName}!`,
               
             html: `
                <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <div style="width: 100%;margin:20px 0; text-align: center;">
                            <a href="http://localhost:3000/"><img src="https://i.postimg.cc/QxNK5h6Y/logo-Luxxor.png"" /></a>
                        </div>
                    <tr>
                        <td style="background-color: #dfdbdb;border-radius:20px;box-shadow: 0 5px 16px 0 #433e3e94">
                        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                            <h1 style="color: #7A5EA8; margin: 0 0 7px">Cambio de Contraseña</h1>
                            <h2 style="color: #000; margin: 0 0 7px">¡Hola ${userFound.firstName} ${userFound.lastName}!</h2>
                            <p style="margin: 2px; font-size: 15px; color: #000">
                                    Te enviamos este e-mail para comunicarte que has solicitado el cambio de contraseña, haz click en el botón que aparece a continuación para cambiar tu contraseña:
                            </p>
                            <a href="http://localhost:3000/cambio-contrasenia/${userFound._id}"><button  style="background-color: #f48f31;color: white; border:none; padding:0.5rem 1rem">Cambiar contraseña</button></a>
                            <hr/>
                            <p style="color: #34495e; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                            
                        </td>
                    </tr>
                </table>
                    `
            }
            transport.sendMail(mail, (err, info) => {
                if (err) throw new Error(err)
                res.json({ success: true, response: info })
            })

        })
        .catch( err => handleError(res, err) )
    },

    verifyAdmin: (req, res, next) => {
        if(req.user.admin){
            next()
        } else {
            res.json({ success: false, response: "Admin permissions required"})
        }
    },

    // saveNewSale: (req, res) => {
    //     console.log("Received SAVE NEW SALE Petition:" + Date())
    //     // const {userId, amount, shopCart, shipping, methodPayment} = req.body
    //     console.log(req.body)
    //     // console.log(req.user)
    //     res.json({ success: true })
    // },

    saveNewSale: (req, res) => {
        console.log("Received SAVE NEW SALE Petition:" + Date())
        res.json({ success: true, response: req.body })
    },
}

module.exports = usersControllers