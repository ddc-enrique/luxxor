import React,  { useState, useEffect }from "react";
import styles from "../styles/modalCart.module.css";
import { connect } from "react-redux";

const CardProductCart = (props) =>{
    const[counter,setCounter]=useState(0)
    console.log(props.sale)
    return(
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
            </div>
            <div className={styles.containerSubTotal}>
                    <span className={styles.spanSubtotal}>$282.000</span>
                    <img className={styles.iconDelete} src='https://i.postimg.cc/1zysmTqh/bin.png'/>                           
            </div>
                    
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
       
    }
}
const mapDispatchToProps ={
    
}

export default connect(mapStateToProps,mapDispatchToProps)(CardProductCart)