import axios from "axios"
import Product from "../../components/Product"

const productsActions = {
    categories: () =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/categories")
                if(!response.data.success) throw new Error(response.data.response)
                dispatch({type: "CATEGORIES", payload: response})
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

    addCategory: (name) => {
        return async () => {
            try {
                let res = await axios.post('http://localhost:4000/api/admin/categories', name)
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
                    dispatch({type: "BRANDS", payload: response})
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


    addProduct: (product) =>{
        console.log(product)  
        return async (dispatch) =>{
            try {
                let response = await axios.post("http://localhost:4000/api/products", product)
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

    deleteProduct: (id) =>{
        return async (dispatch) => {
            try {
                let response = await axios.delete(`http://localhost:4000/api/product/${id}`)
                    return response.data
            }catch(e){
                return ({success: false, response: e})
            }
        }
    }

}
export default productsActions