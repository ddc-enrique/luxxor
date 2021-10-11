const Sale = require('../models/Sale')
const User = require('../models/User')
const Product = require('../models/Product')

const salesControllers = {
    // enviar el mail aca tambien
    saveNewSale: (req, res) => {
        console.log("Received SAVE NEW SALE Petition:" + Date())
        const {userId, amount, shopCart, shipping, methodPayment} = req.body
        console.log(req.body)
        const newSale = new Sale({
            user: userId,
            amount,
            shopCart,
            shipping,
            methodPayment,
            date: Date()
        })
        
        newSale.save()
        .then((savedSale) => {
            savedSale.shopCart.forEach((item) => {
                Product.findOneAndUpdate({_id: item.productId }, {$inc: {"stock": (item.quantity*-1) }}, {returnOriginal: false})
                .then((product)=>{console.log(product.stock)})
            })
        })
        .catch((error) => res.json({ success: false, response: error.message}))
        
        User.findOne({_id: userId})
        .then((userFound) => console.log(userFound.eMail)) //desde aca se envia el mail
        .catch((error) => res.json({ success: false, response: error.message }))
        
        res.json({ success: true })
    },

    getAllSales: (req, res) => { // para que el admin obtenga todas las ventas

    }
}

module.exports = salesControllers