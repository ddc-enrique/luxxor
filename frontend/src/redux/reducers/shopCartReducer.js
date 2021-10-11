const initialState={
    shopCart:[],
    subtotal:0,
    total:0,
}
const shopCartReducer=(state=initialState ,action)=>{
    switch(action.type){
        case 'ADD':
        let productFound = state.shopCart.find((item) => item.productId === action.payload.id);
            let aux_shopCart_add=state.shopCart.map(item=>
                item.productId===action.payload.id
                    ?{productId:item.productId,quantity: item.quantity + 1}
                    :item    
            )
            let aux_shopCart_add_2=[...state.shopCart,{productId:action.payload.id,quantity:1}]
            let subtotal_add=state.subtotal+action.payload.price
            let total_add=parseFloat((state.total+((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))

            localStorage.setItem('subtotal',JSON.stringify(subtotal_add))
            localStorage.setItem('total',JSON.stringify(total_add))
            
            if(productFound){
                localStorage.setItem('shopCart',JSON.stringify(aux_shopCart_add))
                return{
                    ...state,
                    shopCart:aux_shopCart_add,
                    subtotal:subtotal_add,
                    total:total_add
                }
            }else{
                localStorage.setItem('shopCart',JSON.stringify(aux_shopCart_add_2))
                return{
                    ...state,
                    shopCart:aux_shopCart_add_2,
                    subtotal:subtotal_add,
                    total:total_add
                }
            }

            case'DELETE':
            let productToDelete=state.shopCart.find(item=>item.productId===action.payload.id)
                let aux_shopCart_delete=state.shopCart.map(item=>
                    item.productId===action.payload.id
                    ?{...item,quantity:item.quantity-1}
                    :item
                )
                let aux_shopCart_delete_2=state.shopCart.filter(item=>item.productId!==action.payload.id)
                let subtotal_delete=state.subtotal-(action.payload.price)
                let total_delete= parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))

                localStorage.setItem('subtotal',JSON.stringify(subtotal_delete))
                localStorage.setItem('total',JSON.stringify(total_delete))     
                 
                if(productToDelete.quantity > 1){
                    localStorage.setItem('shopCart',JSON.stringify(aux_shopCart_delete))
                    return{
                        ...state,
                        shopCart:aux_shopCart_delete,
                        subtotal:state.subtotal-(action.payload.price),
                        total:parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))
                    }
                }else{
                    localStorage.setItem('shopCart',JSON.stringify(aux_shopCart_delete_2))
                    return{
                        ...state,
                        shopCart:aux_shopCart_delete_2, 
                        subtotal:state.subtotal-(action.payload.price),
                        total:parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))
                    }
                }

            case 'DELETE_ALL_QUANTITY': {
                let aux_shopCart=state.shopCart.filter(item=>item.productId!==action.payload.id)
                let subtotal_delete_quantity=state.subtotal-(action.payload.price*action.payload.quantity)
                let total_delete_quantity=parseFloat((state.total-((action.payload.price*action.payload.quantity)*(100-action.payload.discount)/100)).toFixed(2))

                localStorage.setItem('shopCart',JSON.stringify(aux_shopCart))
                localStorage.setItem('subtotal',JSON.stringify( subtotal_delete_quantity))
                localStorage.setItem('total',JSON.stringify(total_delete_quantity ))    

                return {
                    ...state,
                    shopCart: aux_shopCart,
                    subtotal:subtotal_delete_quantity,
                    total:total_delete_quantity
                }   
            }
            case 'RESET_CART':{
                localStorage.removeItem('shopCart')
                localStorage.removeItem('subtotal')
                localStorage.removeItem('total')
                return {
                    ...state,
                    shopCart:[],
                    subtotal:0,
                    total:0,                    
                }
            }    
            case 'LOAD_LS':{
                return {
                    ...state,
                    shopCart:JSON.parse(action.payload.shopCart),
                    subtotal:JSON.parse(action.payload.subtotal),
                    total:JSON.parse(action.payload.total),                    
                }
            }
        default:
            return state
    }
}
export default shopCartReducer

