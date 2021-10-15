const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const path = require("path")
const Stripe = require("stripe")
const stripe = new Stripe(process.env.KEY_STRIPE)

const productsControllers = {

    getAllProducts:(req,res)=>{
        Product.find().populate('brand').populate('category')    
        .then(products=>{
            if(!products.length) throw new Error('No hay productos cargados') 
            res.json({success:true, response:products})
        })
        .catch(error=>res.json({success:false, response:error.message}))
    },

    addProduct:(req,res)=>{   
           
        const{name,stock,price,color,dataSheet,description,discount,category,brand}=req.body
        const{photos}=req.files
        route = path.join(__dirname, "../assets/productsPhoto") 
    
        let dataSheetToSave = dataSheet.map((data)=>{
            let dataArray = data.split(",")
            let optionName = dataArray[0]
            let optionValue = dataArray[1]
            return {optionName, optionValue}
        })

        const newProduct =new Product ({
            name,
            stock,
            price,
            color,
            description,
            dataSheet: dataSheetToSave,
            discount,
            category,
            brand 
        })
        Product.findOne({name})
        .then(productFound=>{
            if(productFound) throw new Error("Ya existe un Producto con ese mismo nombre")

            photos.map((photo, index)=>{
                let fileName = photo.md5 + "." + photo.name.split(".")[photo.name.split.length-1] 
                newProduct.photos[index] = fileName
                photo.mv(`${route}/${fileName}`)
            })

             newProduct.save()
            .then(productSaved=>res.json({success:true,response:productSaved}))
        })
        .catch(error=>res.json({success:false,response:error.message}))
    },
    editProduct:(req,res)=>{
        const _id = req.params.id
        Product.findOneAndUpdate({_id},{...req.body},{new:true})
        .then(editedProduct=>res.json({success:true,response:editedProduct}))
        .catch(error=>res.json({success:false,response:error.message}))
    },
    deleteProduct:(req,res)=>{
        const _id = req.params.id
        Product.findOneAndDelete({_id})
        .then(() => res.json({success: true}))
        .catch(error=> res.json({success: false, response:error.message}))
    },
    getOneProduct:(req,res)=>{
        Product.findById(req.params.id).populate('brand').populate('category') 
        .then( productFound => {
            if(!productFound) throw new Error("No se encontro ningun Producto")
            res.json({success:true, response:productFound})
        })
        .catch(error=> res.json({success: false, reponse:error.message}))
    },
    productOnCart:async(req, res)=>{
        try {
            let response = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "USD",
                description: "Compré",
                payment_method: req.body.id,
                confirm: true
            })
         res.json({success: true, response})
        }catch(e){
            res.json({message: e})
        }
    }

}

module.exports = productsControllers