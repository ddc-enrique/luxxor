const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require("path")


const handleError = (res, err) =>{
    // console.log(err.message)
    res.json({success: false, response: err.message})
}

        const usersControllers = {
            signUp: (req, res) =>{
                
                console.log("Received Register User Petition:" + Date())
                const { firstName, lastName, eMail, password, google } = req.body
                
                let hashedPass = bcryptjs.hashSync(password.trim())
                const adminUser = [ process.env.ADMIN1 ]
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
                    let fileName = newUser.eMail + "." + req.files.profilePic.name.split(".")[req.files.profilePic.name.split.length-1]
                        newUser.profilePic = fileName
        
                    route = path.join(__dirname, "../assets")
                    req.files.profilePic.mv(`${route}/${fileName}`)
                }else{
                    newUser.profilePic = req.body.profilePic
                }
                
                User.findOne({ eMail })
                    .then( (userFound) => {
                        if(userFound) throw new Error("Usuario ya registrado")
                        newUser.save()
                            .then( (user) => {
                                const token = jwt.sign({...newUser}, process.env.SECRETORKEY) 
                                res.json({success: true, response: {profilePic: user.profilePic, firstName: user.firstName, lastName: user.lastName, eMail: user.eMail, token: token, admin: user.admin, _id:user._id}})                  
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
                // if (!userFound.validated) throw new Error("Verifique la cuenta via su email")
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

    verifyToken: (req, res) => {
        const {profilePic, firstName, lastName, eMail, admin, dni, _id} = req.user
        res.json({profilePic, firstName, lastName, eMail, admin, dni, id: _id})
     }

}

module.exports = usersControllers