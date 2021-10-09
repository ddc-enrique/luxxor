const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const path = require("path")

const productsControllers = {

    getAllProducts:(req,res)=>{
        console.log("Received GET ALL PRODUCTS Petition:" + Date())
        Product.find().populate('brand').populate('category')    
        .then(products=>{
            if(!products.length) throw new Error('No hay productos cargados') 
            res.json({success:true, response:products})
        })
        .catch(error=>res.json({success:false, response:error.message}))
    },

    addProduct:(req,res)=>{   
           
        console.log("Received ADD PRODUCTS Petition:" + Date())
        const{name,stock,price,color,dataSheet,description,discount,category,brand}=req.body
        const{photos}=req.files
        route = path.join(__dirname, "../assets/productsPhoto") 

        console.log(dataSheet)
    
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
        console.log("Received EDIT PRODUCTS Petition:" + Date())
        const _id = req.params.id
        console.log(req.body)
        Product.findOneAndUpdate({_id},{...req.body},{new:true})
        .then(editedProduct=>res.json({success:true,response:editedProduct}))
        .catch(error=>res.json({success:false,response:error.message}))
    },
    deleteProduct:(req,res)=>{
        console.log("Received DELETE PRODUCTS Petition:" + Date())
        const _id = req.params.id
        Product.findOneAndDelete({_id})
        .then(() => res.json({success: true}))
        .catch(error=> res.json({success: false, response:error.message}))
    },
    getOneProduct:(req,res)=>{
        console.log("Received DELETE PRODUCTS Petition:" + Date())
        Product.findById(req.params.id)
        .then( productFound => {
            if(!productFound) throw new Error("No se encontro ningun Producto")
            res.json({success:true, response:productFound})
        })
        .catch(error=> res.json({success: false, reponse:error.message}))
    },

}

module.exports = productsControllers