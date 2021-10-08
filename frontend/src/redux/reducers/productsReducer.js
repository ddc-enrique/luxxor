const productsReducer = (state={brand: {}, category: {}}, action) => {
    switch (action.title) {
        case "CATEGORY":
            return {
                ...state,
                category: action.payload
            }
        case "BRAND" :
            return {
                brand: action.payload
            }
        default:
            return state
    }
}

export default productsReducer