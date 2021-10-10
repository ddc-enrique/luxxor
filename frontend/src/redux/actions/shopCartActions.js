import axios from "axios"

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
    },
    payCart:(id, amount)=>{
        return async (dispatch)=>{
            let response = await axios.post("http://localhost:4000/api/checkout", id, amount)
            console.log(response)
        }
    }

}
export default shopCartAction