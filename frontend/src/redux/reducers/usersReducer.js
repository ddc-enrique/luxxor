const usersReducer = (state = {profilePic: null, firstName: null, lastName: null, eMail: null, token: null, admin: null}, action) =>{
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