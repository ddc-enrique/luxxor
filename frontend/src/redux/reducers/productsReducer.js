const initialState = {
    brands: [],
    categories: []
}
const productsReducer = (state=initialState, action) => {
    switch (action.title) {
        case "CATEGORIES":
            return {
                ...state,
                categories: action.payload
            }
        case "BRANDS" :
            return {
                ...state,
                brands: action.payload
            }
        default:
            return state
    }
}

export default productsReducer