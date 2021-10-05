const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    eMail: { type: String, required: true},
    profilePic: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        city: { type: String },
        zipCode: { type: Number },
        street: { type: String }, // nombre y numero 
        optional: { type: String},
    },
    phone: { type: String }, //solo signo + - y numeros
    dni: { type: Number }, 
    admin: { type: Boolean, default: false },
    google: { type: Boolean, default: false },
    validated: { type: Boolean, default: false},
})

const User = mongoose.model("user", UserSchema)

module.exports = User