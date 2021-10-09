import axios from "axios"

const shopCartAction={
    addToCart:(id)=>{
        return(dispatch)=>{
            dispatch({type:'ADD', payload:id})
        }
    },
    deleteToCart:(id/* ,deleteAll */)=>{
        return(dispatch)=>{
            /* deleteAll  */
           /*  ? dispatch({type:'DELETE_ALL', payload:id})
            : */dispatch({type:'DELETE', payload:id})            
        }
    },

}
export default shopCartAction