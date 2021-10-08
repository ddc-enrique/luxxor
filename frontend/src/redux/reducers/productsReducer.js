const initialState = {
    brands: [],
    categories: []
}
const productsReducer = (state=initialState, action) => {
    switch (action.title) {
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