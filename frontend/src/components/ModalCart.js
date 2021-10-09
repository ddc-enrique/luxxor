import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
// import styles from "../styles/modal2.module.css";
import { connect } from "react-redux";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"
import shopCartActions from "../redux/actions/shopCartActions"

const ModalCart = (props) =>{

    return(
        <div className={styles.containerGeneral}>
            <div className={styles.containerCart}>
                <img onClick={()=>props.setModalCart(false)} className={styles.iconClose} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/>
                
                <h2>Carrito de Compras</h2>
                <div className={styles.containerSubTitle}>
                    <h3>PRODUCTO</h3>
                    <h3>SUBTOTAL</h3>
                </div>
                    <CardProductCart sale={false}/>
                    <CardProductCart sale={false}/>    
                    <Link to="/productos">
                        <div className={styles.price}> <p>Agregar mas productos</p></div>
                    </Link>
                <div className={styles.containerDisconts}>
                    <div className={styles.containerSubTotalCart}>
                        <h3>Subtotal (sin envio):</h3>
                        <span>$282.200</span>
                    </div>
                    <div className={styles.containerSubTotalCart}>
                        <h3>15%OFF</h3>
                        <span>$42.330</span>
                    </div>
                </div>
                <div className={styles.containerShip}>
                    <h3>Seleccione una forma de entrega:</h3>
                    <div>                   
                        <input type="radio" id="pickIt" name="shipping" value={false} checked/>
                        <label for="pickIt"> Retiro en Local</label>                   
                    </div>
                    <div>                
                        <input type="radio" id="ship" name="shipping" value={true} />
                        <label for="ship"> Envio a domicilio</label>                 
                    </div>
                </div>
                <div className={styles.containerTotal}>
                    <h3>TOTAL:</h3>
                    <span>$</span>
                </div>
                <Link to="/checkout">
                        <div className={styles.price}> <p>Finaliza Compra</p></div>
                </Link>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      cartProduct:state.shopCart.cartProduct
    }
  }
  const mapDispatchToProps ={
    addProduct:shopCartActions.addToCart,
    deleteProduct:shopCartActions.deleteToCart
  }
export default connect(mapStateToProps,mapDispatchToProps)(ModalCart)