const initialState={
    shopCart:[],
    total:0,
}
const shopCartReducer=(state=initialState ,action)=>{
    switch(action.type){
        case 'ADD':
 
            let productFound = state.shopCart.find((item) => item.productId === action.payload.id);
            if(productFound){
                return{
                    ...state,
                    shopCart:state.shopCart.map(item=>
                        item.productId===action.payload.id
                            ?{productId:item.productId,quantity: item.quantity + 1}
                            :item    
                    ),
                    total:state.total+action.payload.price,
                }
            }else{
                return{
                    ...state,
                    shopCart:[...state.shopCart,{productId:action.payload.id,quantity:1}],
                    total:state.total+(action.payload.price),
                }
            }

            case'DELETE':
            let productToDelete=state.shopCart.find(item=>item.productId===action.payload.id)
            
            if(productToDelete.quantity > 1){
                return{
                    ...state,
                    shopCart:state.shopCart.map(item=>
                        item.productId===action.payload.id
                        ?{...item,quantity:item.quantity-1}
                        :item
                    ),
                    total:state.total-parseInt(action.payload.price),
                }

            }else{
                return{
                    ...state,
                    shopCart:state.shopCart.filter(item=>item.productId!==action.payload.id), 
                    total:state.total-parseInt(action.payload.price)
                }
            }

            case 'DELETE_ALL_QUANTITY': {
                return {
                    ...state,
                    shopCart: state.shopCart.filter(item=>item.productId!==action.payload.id),
                    total:state.total-(action.payload.price*action.payload.quantity)
                }
                
    
            }
            case 'RESET_CART':{
                return {
                    ...state,
                    shopCart:[],
                    total:0                    
                }
            }    
        
        default:
            return state
    }
}
export default shopCartReducer

