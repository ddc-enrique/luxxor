import axios from "axios"

const usersAction = {
    signIn: (userSignIn) =>{
        
        return async (dispatch, getState) =>{
            try {
                console.log(userSignIn)
                let response = await axios.post("http://localhost:4000/api/user/sign-in", userSignIn)
                console.log(response)
                if(response.data.success){
                    dispatch({type: "SIGN", payload: response.data.response})
                }else {
                    return response.data.errors
                }
            }catch(e) {

            }
        }
    },

    signUp: (userSignUp) =>{
        return async (dispatch, getState) =>{
            try {
                let response = await axios.post("http://localhost:4000/api/user/sign-up", userSignUp)
                if(response.data.success){
                    console.log(response.data.response)
                    dispatch({type: "SIGN", payload: response.data.response})
                }else {
                    return response.data.errors
                }

            }catch(e){
                
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
                        id: response.data.id
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
            console.log(response)
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
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                    }})
                } else {
                    dispatch({ type: "UPDATE_DNI", dispatch: response.data.dni})
                }
            }
        }
    },
    
}

export default usersAction