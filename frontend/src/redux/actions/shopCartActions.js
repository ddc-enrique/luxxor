const shopCartAction={
    addToCart:(id)=>{
        return(dispatch)=>{
            dispatch({type:'ADD', payload:id})
        }
    },
    deleteToCart:(id,deleteAll)=>{
        return(dispatch)=>{
          deleteAll  
            ? dispatch({type:'DELETE_ALL_QUANTITY', payload:id})
            :dispatch({type:'DELETE', payload:id})            
        }
    },
    resetCart:()=>{
        return (dispatch)=>dispatch({type:'RESET_CART'})
    }

}
export default shopCartAction