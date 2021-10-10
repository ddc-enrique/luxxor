import axios from "axios"

const shopCartAction={
    addToCart:(id,price)=>{
        console.log("entre")
        console.log(price)
        return(dispatch)=>{
            dispatch({type:'ADD', payload:{id,price}})
        }
    },
    deleteToCart:(id,deleteAll,price,quantity)=>{
        return(dispatch)=>{
          deleteAll  
            ? dispatch({type:'DELETE_ALL_QUANTITY', payload:{id,price,quantity}})
            :dispatch({type:'DELETE',payload:{id,price}})            
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