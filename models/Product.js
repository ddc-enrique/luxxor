const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, default: 0 }, 
    price: { type: Number, required: true},
    color: { type: String },
    //principalPic: { type: String },
    photos: [ { type: String } ],
    dataSheet: [ { 
        optionName: { type: String },
        optionValue: { type: String }
    } ],
    description: { type: String },
    discount: { type: Number, max: 70,default: 0}, //en porcentaje, si no existe no tiene descuento
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    brand: { type: mongoose.Types.ObjectId, ref: "brand" },
})

const Product = mongoose.model("product", ProductSchema)

module.exports = Product