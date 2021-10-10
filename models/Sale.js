const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
    date: { type: Date },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    shopCart: [{
        quantity: {type: Number },
        productId: { type: mongoose.Types.ObjectId, ref: "product" },
    }],
    amount: { type: Number },
    methodPayment: { type: String }, // Efectivo, Paypal, "stripe"
    shipping: { type: Boolean } //true si es envio, false si retira por local
})

const Sale = mongoose.model("sale", SaleSchema)

module.exports = Sale