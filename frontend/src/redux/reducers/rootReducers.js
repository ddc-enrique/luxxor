import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import productsReducer from "./productsReducer";

const rootReducers = combineReducers({
    users: usersReducer,
    // products: productsReducer,
})

export default rootReducers