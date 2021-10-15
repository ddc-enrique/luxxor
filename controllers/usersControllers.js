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
                        res.json({success: true, response: {profilePic: user.profilePic, google: user.google, firstName: user.firstName, lastName: user.lastName, eMail: user.eMail, token: token, admin: user.admin, _id:user._id, wishList:user.wishList}})                  
                    })
            })
            .catch( err => handleError(res, err) )
    },


    signIn: (req, res) => {
        const { eMail, password, google } = req.body
        const errMessage = "Email y/o contraseña incorrectos"
        User.findOne({ eMail })
            .then( (userFound) => {
                if (!userFound) throw new Error (errMessage)
                if (!google && userFound.google) throw new Error ("Por favor usar Google")
                if (userFound.banned) throw new Error("Cuenta bloqueada")
                if (!bcryptjs.compareSync(password, userFound.password)) throw new Error(errMessage)
                const token = jwt.sign({...userFound}, process.env.SECRETORKEY)
                res.json({success: true, response: {profilePic: userFound.profilePic, google: userFound.google, firstName: userFound.firstName, lastName: userFound.lastName, eMail: userFound.eMail, token: token, admin: userFound.admin, _id: userFound._id, dni:userFound.dni, wishList:userFound.wishList}})
            })
            .catch( err => handleError(res, err) )
    },

    completeProfile: (req, res) => {
        // const { firstName, lastName, dni, address, phone } = req.body
        // const { city, zipCode, street, optional } = address
        User.findOne({ dni: req.body.dni })
            .then( (userFound) => {
                if (userFound) throw new Error ("DNI en uso")
                User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
                    .then( (userUpdated) => {
                        res.json({ success: true, response: userUpdated.dni })
                    } )
            })
            .catch( err => handleError(res, err) )
    },

    editProfile: (req, res) => {

        User.findOneAndUpdate({ _id: req.params.id }, {...req.body}, { new: true })
            .then( (userUpdated) => res.json({ success: true, response: { firstName: userUpdated.firstName, lastName: userUpdated.lastName} }) )
            .catch( err => handleError(res, err) )
    },

    banUser:(req,res)=>{
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
                 <div style="background: rgb(47,144,176);
                 background: radial-gradient(circle, rgba(47,144,176,1) 0%, rgba(48,106,154,1) 55%, rgba(49,75,136,1) 96%); padding: 20px">
                 <table style="max-width: 800px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                                <h1 style="color: #FFF;font-family: sans-serif; margin-left:450px;font-size:2.4rem;">LUXXOR</h1>
                                     <tr>
                 <td style="color: #fff; border: 1px solid">
                                         <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                                             <h1 style="color: #fff; margin: 0 0 7px">Cuenta Bloqueada</h1>
                                             <h2 style="color: #fff; margin: 0 0 7px">¡Hola  ${userFound.firstName} ${userFound.lastName}!</h2>
                                             <p style="margin: 2px; font-size: 15px; color: #fff">
                                                     Te enviamos este e-mail para comunicarle que su cuenta ha sido bloqueada!
                                                     Puede comunicarse a esta casilla de correo para recuperarla.
                                             </p>                    
                                             <hr/>
                                             <p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                                             
                                         </td>
                                     </tr>
                                 </table>
                 </div>                
                    `
            }
            userFound.mailSentPassBan=false
            userFound.banned=true
            userFound.save()
            .then((userUpdated)=>{
                transport.sendMail(mailBanned, (err, info) => {
                    if (err) throw new Error(err)
                    res.json({ success: true, response: info })
                })
            })   
        })
        .catch(err => handleError(res, err))
    },

    changePassword:(req,res)=>{
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
              
<table style="min-width: 700px;min-heigth: 500px; padding: 10px; margin:0 auto; border-collapse: collapse;">
<tr>
                          <td style="background: rgb(47,144,176);
                              background: radial-gradient(circle, rgba(47,144,176,1) 0%, rgba(48,106,154,1) 55%, rgba(49,75,136,1) 96%);box-shadow: 0 5px 16px 0 #433e3e94">
                                 <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                                      <h1 style="color: #FFF; margin-left:450px;font-size:2.4rem;">LUXXOR</h1>
                       <h1 style="color: #FFF; margin: 0 0 7px">Cambio de Contraseña realizado con éxito</h1>
                                   <h2 style="color: white; margin: 0 0 7px">¡Hola ${userFound.firstName} ${userFound.lastName}!</h2>
                                    <p style="margin: 2px; font-size: 15px; color: white">
                                  Te enviamos este e-mail para comunicarte que has cambiado tu contraseña con exito!
                          </p>
                                   <h2 style="color: white; margin: 0 0 7px">INFORMACION IMPORTANTE</h2>
                                    <p style="margin: 2px; font-size: 15px; color: white">
                                   Si tu no realizaste la solicitud de cambio de contraseña, haz click en el siguiente botón:
                          </p>
                  
                                  <a href="http://localhost:3000/bloqueo-cuenta/${userFound._id}"><button  style="border: 1px solid white ;color: white; margin-top: 1rem; padding: 10px; background-color: transparent">Bloquear Cuenta</button></a>
                          <hr/>
                          <p style="color: white; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                          
                     
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
        eMail=req.body.eMail
        User.findOne({eMail:eMail})
        .then(userFound=>{
            if( !userFound) throw new Error("No se encontro ningun usuario")
            let mail = {
                from: 'Luxxor <luxxor.tech@gmail.com>',
                to: eMail,
                subject: `Cambio de contraseña ${userFound.lastName}, ${userFound.firstName}!`,
               
             html: `
                
<table style="max-width: 800px;min-heigth: 500px; padding: 10px; margin:0 auto; border-collapse: collapse;">
<tr>
                          <td style="background: rgb(47,144,176);
                              background: radial-gradient(circle, rgba(47,144,176,1) 0%, rgba(48,106,154,1) 55%, rgba(49,75,136,1) 96%);box-shadow: 0 5px 16px 0 #433e3e94">
                                 <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif;border-radius:20px;">
                                      <h1 style="color: #FFF; margin-left:500px;font-size:2.4rem;">LUXXOR</h1>
                       <h1 style="color: #FFF; margin: 0 0 7px">Cambio de Contraseña</h1>
                                   <h2 style="color: white; margin: 0 0 7px">¡Hola ${userFound.firstName} ${userFound.lastName}!</h2>
                                    <p style="margin: 2px; font-size: 15px; color: white">
                                  Te enviamos este e-mail para comunicarte que has solicitado el cambio de contraseña, haz click en el botón que aparece a continuación para cambiar tu contraseña:
                          </p>
                  
                                   <a href="http://localhost:3000/cambio-contrasenia/${userFound._id}"><button  style="background-color: transparent;color: white; border:1px solid white; margin: 10px 0; padding:0.5rem 1rem">Cambiar contraseña</button></a>
                          <hr/>
                          <p style="color: white; font-size: 14px; text-align: center;">© Copyright 2021 | Luxxor.</p>
                          
                     
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



    saveNewSale: (req, res) => {
        res.json({ success: true, response: req.body })
    },

    addWish: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {$push: {wishList: {productId: req.body.productId}}}, {new: true}).populate("wishList.productId")
        .then(response => res.json({success: true, response}))
        .catch(error => {res.json({success: false, response: error})})
    }
}

module.exports = usersControllers