import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"

const CardProductCart = (props) =>{
   const {product}=props
    const[counter,setCounter]=useState(product.quantity)
    const subTotalProduct=useRef(null)
    /* setTotal(total+subTotalProduct) */
    const deleteProductHandler=()=>{
        if(counter>1){
            props.deleteProduct(product._id,false)
            setCounter(counter-1)
        }
    }
    if(subTotalProduct.current){
        props.setTotal(subTotalProduct.current.value) 
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
                    <span>$ {" "+product.price}</span>
                    <div className={styles.counter}>
                        <div className={styles.icon}
                            style={{
                            backgroundImage:
                                "url('https://i.postimg.cc/63nKHn7j/3-removebg-preview-2.png')",
                            }}
                            onClick={deleteProductHandler}></div>
                        <span>{counter}</span>
                        <div
                            className={styles.icon}
                            style={{
                            backgroundImage:
                                "url('https://i.postimg.cc/0NLxdcNK/2-removebg-preview-4.png')",
                            }}
                            onClick={() => {props.addProduct(product._id);setCounter(counter+1)}}
                        ></div>
                        
                    </div>                   
                </div>
            </div>
            <div className={styles.containerSubTotal}>
                    <span className={styles.inputSubtotal}>{" "+counter*product.price}</span>
                    <img onClick={() => props.deleteProduct(product._id,true)} className={styles.iconDelete} src='https://i.postimg.cc/1zysmTqh/bin.png'/>                           
            </div>
                    
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps ={
    addProduct:shopCartActions.addToCart,
    resetCart:shopCartActions.resetCart
  }

export default connect(mapStateToProps,mapDispatchToProps)(CardProductCart)