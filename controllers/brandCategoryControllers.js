const Brand = require('../models/Brand')
const Category = require('../models/Category')

const brandCategoryControllers={

    getAll: async(req,res)=>{
        const flagBrand = req.url.includes('brand')
        try{
            let fieldValues= flagBrand ? await Brand.find() : await Category.find()
            if(!fieldValues.length) throw new Error(`No hay ${flagBrand ? "Marcas" : "Categorías" } cargadas`)
            res.json({success:true,response:fieldValues})
        }catch(error){
            res.json({success:false,response:error.message})
        }
    },

    addValueField: async (req,res)=>{
        const flagBrand = req.url.includes('brand')
        let name=req.body.name
        try{
            let existField = flagBrand ? await Brand.findOne({name}) : await Category.findOne({name})
            if(existField) throw new Error(`Esa ${flagBrand ? "Marca" : "Categoría"} ya existe`)
            let newField = flagBrand ? new Brand({...req.body}) : new Category({...req.body}) 
            await newField.save()
            res.json({success:true,response:name})
        }
        catch(error){
            res.json({success:false,response:error.message})
        }
    },

    editValueField:async (req,res)=>{
        const flagBrand = req.url.includes('brand')
        const name= req.body.name
        const _id =req.params.id
        try{
            flagBrand? await Brand.findOneAndUpdate({_id},{name}) : await Category.findOneAndUpdate({_id},{name})
            res.json({success:true, response:name})
        }catch(error){
            res.json({success:false,response:error.message})
        }
    },

    deleteValueField: async (req,res)=>{
        const flagBrand = req.url.includes('brand')
        const _id =req.params.id
        try{
            flagBrand ? await Brand.findOneAndDelete({_id}) : await Category.findOneAndDelete({_id})
            res.json({success:true})
        }catch(error){
            res.json({success:false})
        }        
    },
    getOneValueField:async(req,res)=>{
        const flagBrand = req.url.includes('brand')
        const _id =req.params.id
        try{
            const fieldValue = flagBrand ? await Brand.findById({_id}) : await Category.findById({_id})
            if(!fieldValue) throw new Error()
            res.json({success:true, response:fieldValue})
        }catch(error){
            res.json({success:false})
        }

    } 
    
}
module.exports=brandCategoryControllers