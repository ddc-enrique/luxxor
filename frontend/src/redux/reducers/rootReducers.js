import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import productsReducer from "./productsReducer";
import shopCartReducer from "./shopCartReducer"

const rootReducers = combineReducers({
    users: usersReducer,
    products: productsReducer,
    shopCart:shopCartReducer,
    
})

export default rootReducers