const User = require('../models/User')
const handleError = (res, err) =>{
    // console.log(err.message)
    res.json({success: false, response: err.message})
}

const usersControllers = {
    signUp: (req, res) =>{
        console.log("Received Register User Petition:" + Date())
        const { firstName, lastName, eMail, password, profilePic, google } = req.body
        let hashedPass = bcryptjs.hashSync(password)
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
        User.findOne({ eMail })
            .then( (userFound) => {
                if(userFound) throw new Error("Usuario ya registrado")
                newUser.save()
                    .then( (user) => {
                        const token = jwt.sign({...newUser}, process.env.SECRETORKEY)
                        res.json({success: true, response: {profilePic: user.profilePic, firstName: user.firstName, lastName: user.lastName, eMail: user.eMail, token: token, admin: user.admin, }})
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
                User.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
                    .then( () => res.json({ success: true, response: { firstName: userFound.firstName, lastName: userFound.lastName } }) )
            })
            .catch( err => handleError(res, err) )
    },

    editProfile: (req, res) => {
        console.log("Received EDIT DATA USER Petition:" + Date())

        User.findOneAndUpdate({ _id: req.params.id }, {...req.body} )
            .then( () => res.json({ success: true, response: { firstName: userFound.firstName, lastName: userFound.lastName } }) )
            .catch( err => handleError(res, err) )
    },

    

}

module.exports = usersControllers