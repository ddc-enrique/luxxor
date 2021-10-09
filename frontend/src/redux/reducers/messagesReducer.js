const productsReducer = (state=initialState, action) => {
    
    switch (action.title) {
        case "PRODUCTS":
            return {
                ...state,
                products: action.payload,               
            }     
        case "BRANDS":
            return {
                ...state,
                brands: action.payload
            }
        case "CATEGORIES":
            return {
                ...state,
                categories: action.payload
            }       
        default:
            return state       
    } 
}

export default productsReducer