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
            return {
                ...state
            }
            default:
                return state
    }
}

export default usersReducer