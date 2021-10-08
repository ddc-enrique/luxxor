import axios from "axios"

const productsActions = {
    categories: () =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/categories")
                dispatch({type: "CATEGORIES", payload: response})

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

    brands: () => {
        return async (dispatch) =>{
            try {
                let response = axios.get("http://localhost:4000/api/admin/brands")
                dispatch({type: "BRANDS", payload: response})
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    brand: () => {
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
                let response = axios.get("http://localhost:4000/api/products")

                return response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    product: (id) => {
        return async (dispatch) =>{
            try {
                let response = axios.get(`http://localhost:4000/api/product/${id}`)
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


}
export default productsActions