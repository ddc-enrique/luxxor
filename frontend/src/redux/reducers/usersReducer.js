const initialState = {
    profilePic: null, 
    firstName: null, 
    lastName: null, 
    eMail: null, 
    token: null, 
    admin: null, 
    dni: null, 
    id: null
}
const usersReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "SIGN":
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                profilePic: action.payload.profilePic, 
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName, 
                eMail: action.payload.eMail, 
                admin: action.payload.admin, 
                id: action.payload._id,
                token: action.payload.token,
                dni: action.payload.dni
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            return initialState
        case "UPDATE_USER":
            return{
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }
        case "UPDATE_DNI":
            return{
                ...state,
                dni: action.payload.dni
            }
        default:
            return state
    }
}

export default usersReducer