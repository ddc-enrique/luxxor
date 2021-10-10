
const shopCartReducer=(state=[],action)=>{
    switch(action.type){
        case 'ADD':
            //grabarlo en el localStorage
            let productFound = state.find((item) => item.productId === action.payload);
            return productFound
            ? state.map(item=>
                    item.productId===action.payload
                        ?{productId:item.productId,quantity: item.quantity + 1}
                        :item    
            )
                            
            :[
                ...state,
                {productId:action.payload,quantity:1}
            ]
                         
        case'DELETE':
            let productToDelete=state.find(item=>item.productId===action.payload)
            return productToDelete.quantity > 1
            ?state.map(item=>
                    item.productId===action.payload
                    ?{...item,quantity:item.quantity-1}
                    :item
            )
            :state.filter(item=>item.productId!==action.payload)
            
            /* let arr_id= state.cartProduct.map(item=>item.productId)
            state.cartProduct.splice(arr_id.indexOf(action.payload),1)
            console.log(state)
            return[...state] */

             /* state.cartProduct.filter(item=>item.productId!==action.payload) */

        case 'DELETE_ALL_QUANTITY': {
            return state.filter(item=>item.productId!==action.payload)

            }
        case 'RESET_CART':{
            return []
        }
        default:
            return state
    }
}
export default shopCartReducer

