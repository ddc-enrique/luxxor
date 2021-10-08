import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";

const ModalCart = (props) =>{
    const[counter,setCounter]=useState(0)

    return(
        <div className={styles.containerTotal}>
            <div className={styles.containerCart}>
                <img onClick={()=>props.setModalCart(false)} className={styles.iconClose} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/>
                
                <h2>Carrito de Compras</h2>
                <div className={styles.containerSubTitle}>
                    <h3>PRODUCTO</h3>
                    <h3>SUBTOTAL</h3>
                </div>
                <div className={styles.containerProductTotal}>
                    <div className={styles.containerProduct}>
                        {/* <div
                        className={styles.photo}
                        style={{
                            backgroundImage: `url("https://home.ripley.com.pe/Attachment/WOP_5/2004209413829/2004209413829-1.jpg")`,
                        }}
                        ></div> */}
                       <img width="90" src="https://home.ripley.com.pe/Attachment/WOP_5/2004209413829/2004209413829-1.jpg"/>
                       <div className={styles.containerProductTetx}>
                           <p>MacBook Air 13.3</p>
                           <span>$ $282.000</span>
                           <div className={styles.counter}>
                                <div
                                    className={styles.icon}
                                    style={{
                                    backgroundImage:
                                        "url('https://i.postimg.cc/63nKHn7j/3-removebg-preview-2.png')",
                                    }}
                                    onClick={() => setCounter(counter - 1)}
                                ></div>
                                <span>{counter}</span>
                                <div
                                    className={styles.icon}
                                    style={{
                                    backgroundImage:
                                        "url('https://i.postimg.cc/0NLxdcNK/2-removebg-preview-4.png')",
                                    }}
                                    onClick={() => setCounter(counter + 1)}
                                ></div>
                                
                            </div>                   
                       </div>
                       <span className={styles.spanSubtotal}>$282.000</span>
                    </div>
                    
                </div>
                <div className={styles.price}>            
                    <p>Agregar mas productos</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
       
    }
}
const mapDispatchToProps ={
    sendMail: usersAction.sendMail
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalCart)