const initState = {
    profilePic: null, 
    firstName: null, 
    lastName: null, 
    eMail: null, 
    token: null, 
    admin: null, 
    dni: null, 
    id: null
}
const usersReducer = (state = initState, action) =>{
    switch (action.type) {
        case "SIGN":
            localStorage.setItem("token", action.payload.token)
            return {
                profilePic: action.payload.profilePic, 
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName, 
                eMail: action.payload.eMail, 
                admin: action.payload.admin, 
                id: action.payload._id
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                profilePic: null, 
                firstName: null, 
                lastName: null, 
                eMail: null, 
                token: null, 
                admin: null, 
                dni: null, 
                id: null
            }
            default:
                return state
    }
}

export default usersReducer