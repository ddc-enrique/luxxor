import axios from "axios"

const usersAction = {
    signIn: (userSignIn) =>{        
        return async (dispatch, getState) =>{
            try {
                let response = await axios.post("http://localhost:4000/api/user/sign-in", userSignIn)
                // if(response.data.response === 'Email y/o contraseña incorrectos' || response.data.response === 'Por favor usar Google')return response.data.response                
                if(response.data.success){
                    dispatch({type: "SIGN", payload: response.data.response})
                }else {
                    return response.data.response
                }
            }catch(e) {
                return ({success: false, response: e})
            }
        }
    },

    signUp: (userSignUp) =>{
        return async (dispatch, getState) =>{
            try {
                let response = await axios.post("http://localhost:4000/api/user/sign-up", userSignUp)
                // if(response.data.response === 'Usuario ya registrado')return response.data.response                
                if(response.data.success){
                    dispatch({type: "SIGN", payload: response.data.response})
                }
                return response.data
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },

    signWithLocal: (token)=>{
        return async (dispatch)=>{
            try {
                let response = await axios.get("http://localhost:4000/api/verifyToken", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                dispatch({type: "SIGN", 
                payload: {token: token, 
                        profilePic: response.data.profilePic,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName, 
                        eMail: response.data.eMail, 
                        admin: response.data.admin, 
                        _id: response.data.id,
                        dni: response.data.dni,
                        google: response.data.google,
                    }})
            }catch(e){
                dispatch({type: "LOGOUT"})
            }
        }
    },

    getUserData: (id, token) => {
        return async (dispatch) => {
            let response = await axios.get(`http://localhost:4000/api/user/edit-profile/${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (!response.data.success) throw new Error(response.data.response)
            return response.data.response
        }
    },

    sendMail:(eMail)=>{
        return async (dispatch)=>{
            let response =await axios.post("http://localhost:4000/api/user/mail-password",{eMail})
            return response.data.success
        }
    },
    verifyIdMail:(id,type)=>{
        return async (dispatch)=>{
            if(type==="VERIFICAR USUARIO"){
                let response = await axios.get(`http://localhost:4000/api/user/verifyId/${id}`)
                if(response.data.success) return response.data.success
            }else{
                let response = await axios.get(`http://localhost:4000/api/user/verify-mail/${id}`)
                if(response.data.success){
                    return response.data.success
                }
            }
            
        }
    },
    changePassword:(eMail,password)=>{
        return async (dispatch)=>{
            let response = await axios.put("http://localhost:4000/api/user/change-password",{eMail,password})
            if(response.data.success) return response.data.success
        }
    },
    banAccount:(id)=>{
        return async (dispatch)=>{
            let response = await axios.put(`http://localhost:4000/api/user/bann-user/${id}`)
            if(response.data.success) return response.data.success
        }
    },
    editDataUser: (id, flagEdit, token, dataUser) => {
        return async (dispatch) => {
            const url = `http://localhost:4000/api/user/edit-profile/${id}`
            const headers = { Authorization: "Bearer " + token }
            let response = flagEdit ? await axios.put(url, {...dataUser}, { headers } ) : await axios.post(url, {...dataUser}, { headers })
            if(response.data.success){
                if(flagEdit){
                    dispatch({ type: "UPDATE_USER", 
                    payload:{
                        firstName: response.data.response.firstName,
                        lastName: response.data.response.lastName,
                    }})
                } else {
                    dispatch({ type: "UPDATE_DNI", payload: response.data })
                }
                return response.data
            } else {
                throw response.data.response
            }
        }
    },

    signOut: ()=>{
        return (dispatch) => {
            dispatch({ type:"LOGOUT" })
        }
    },
    
    sendNewBill: (userId, amount, shopCart, shipping, methodPayment, token) => {
        return async () => {
            let data = {userId, amount, shopCart, shipping, methodPayment}
            let response = await axios.post("http://localhost:4000/api/sales", data , {
                    headers: {
                        Authorization: "Bearer " + token
                    }
            })
            return response.data
        }
    },

    addToWishList: (id, userId) => {
        return async () => {
            try {
                let response = await axios.put(`http:localhost:4000/api/user/wish/${userId}`, {productId: id})
                    if (!response.success) throw new Error("Error")
                    return response.data
            }catch(e){
                return ({success: false, response: e.message})
            }
        }
        
    }
}

export default usersAction