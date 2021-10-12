import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"
import toast, { Toaster } from "react-hot-toast"
import {  PlusCircle, DashCircle, X} from 'react-bootstrap-icons'

const CardProductCart = (props) =>{
   const {product}=props
    const[counter,setCounter]=useState(product.quantity)
    /* setTotal(total+subTotalProduct) */
    const addProductHandler=()=>{
        if(counter<product.stock){
            props.addProduct(product._id,product.price,product.discount,product.name)
            setCounter(counter+1)
        }else{
            toast("No hay mas unidades a la venta", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                }
            })
        }
    }
    const deleteProductHandler=()=>{
        if(counter>1){
            props.deleteProduct(product._id,false,product.price,counter,product.discount)
            setCounter(counter-1)
        }
    }

    

    return(
        <div className={styles.containerProductTotal}>
            <div className={styles.containerProduct}>
                {/* <div
                className={styles.photo}
                style={{
                    backgroundImage: `url("https://home.ripley.com.pe/Attachment/WOP_5/2004209413829/2004209413829-1.jpg")`,
                }}
                ></div> */}
                <img width="90" src={`http://localhost:4000/productsPhoto/${product.photos[0]}`}/>
                <div className={styles.containerProductTetx}>
                    <p>{product.name}</p>
                    <span>$ {" "+product.price.toFixed(2)}</span>
                    <div className={styles.counter}>
                        <DashCircle onClick={deleteProductHandler} className={styles.iconClose}/>
                        <span>{counter}</span>
                         <PlusCircle onClick={addProductHandler} className={styles.iconClose}/>
                    </div>                   
                </div>
            </div>
            <div className={styles.containerSubTotal}>
                    <span  className={styles.inputSubtotal}>${" "+(counter*product.price).toFixed(2)}</span>
                    
            </div>
            <X onClick={() => props.DeleteProductModalCart(product._id,true,product.price,counter,product.discount)} className={styles.iconClose}/>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps ={
    addProduct:shopCartActions.addToCart,
    resetCart:shopCartActions.resetCart,
    deleteProduct:shopCartActions.deleteToCart
  }

export default connect(mapStateToProps,mapDispatchToProps)(CardProductCart)