import axios from "axios"
import Product from "../../components/Product"

const productsActions = {
    categories: () =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/categories")
                if(!response.data.success) throw new Error(response.data.response)
                dispatch({type: "CATEGORIES", payload: response.data.response})
                return response.data.response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    category: (id) =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get(`http://localhost:4000/api/admin/category/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    addCategory: (name, token) => {
        return async () => {
            try {
                let res = await axios.post('http://localhost:4000/api/admin/categories', name, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                return res
            }catch(e){
                console.log(e)
            }
        }
    },
    editCategory: (id,category, token) =>{
        return async () => {
            try {
                let res = await axios.put(`http://localhost:4000/api/admin/category/${id}`, {...category}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    return res
            }catch(e){
               console.log(e)
            }
        }
    },
    deleteCategory: (id, token) =>{
        return async () => {
            try {
                let res = await axios.delete(`http://localhost:4000/api/admin/category/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    return res
            }catch(e){
               console.log(e)
            }
        }
    },
    addBrand: (name, token) => {
        return async () => {
            try {
                let res = await axios.post('http://localhost:4000/api/admin/brands', name, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                return res
            }catch(e){
                console.log(e)
            }
        }
    },
    editBrand: (id,brand, token) =>{
        return async () => {
            try {
                let res = await axios.put(`http://localhost:4000/api/admin/brand/${id}`, {...brand}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    return res
            }catch(e){
               console.log(e)
            }
        }
    },
    deleteBrand: (id, token) =>{
        return async () => {
            try {
                let res = await axios.delete(`http://localhost:4000/api/admin/brand/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    return res
            }catch(e){
            console.log(e)
            }
        }
    },
    brands: () => {
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/brands")
                if(response.data.success) {
                    dispatch({type: "BRANDS", payload: response.data.response})
                    return response.data.response
                }else {
                    throw new Error(response.data.response)
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    brand: (id) => {
        return async (dispatch) =>{
            try {
                let response = axios.get(`http://localhost:4000/api/admin/brand/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    products: () => {
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/products")
                if (!response.data.success) throw new Error(response.data.response)
                dispatch({type: "PRODUCTS", payload: response.data.response})
                return response.data.response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    product: (id) => {
        return async (dispatch) =>{
            try {
                let response = await axios.get(`http://localhost:4000/api/product/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },


    addProduct: (product, token) =>{
        console.log(product)  
        return async (dispatch) =>{
            try {
                let response = await axios.post("http://localhost:4000/api/products", product, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                if (response.data.success){
                    return response.data
                }else {
                    return response.data
                }
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },

    deleteProduct: (id, token) =>{
        return async (dispatch) => {
            try {
                let response = await axios.delete(`http://localhost:4000/api/product/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    return response.data
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },

    editProduct: (id, productToEdit, token) =>{
        return async (dispatch) => {
            try {
                let response = await axios.put(`http://localhost:4000/api/product/${id}`, productToEdit, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                return response
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },

    productsByUser: (id) => {
        return async (dispatch) => {
            try{
                let response =  await axios.get(`http://localhost:4000/api/user/myshopping/${id}`)
                if (!response.data.success) throw new Error(response.data.response)
                return response.data.response
            }catch(e){
                return ({success: false, response: e.message})
            }
        }
    },

}
export default productsActions