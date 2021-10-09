import React,  { useState, useEffect}from "react";
import styles from "../styles/payment.module.css";
import { connect } from "react-redux";

const Payment = (props) =>{
    

    return(
        <>
            <h3 className={styles.title}>SELECCIONA UN METODO DE PAGO:</h3>
            <div className={styles.container}>
                <div onClick={()=>props.setScreen(3)} className={styles.boxMethod}>
                    <img className={styles.iconCard} src="https://i.postimg.cc/PqzxgQZ6/money.png"/>
                    <h3>Contado Efectivo</h3>
                </div>
                <div onClick={()=>props.setScreen(3)}className={styles.boxMethod}>
                <img className={styles.iconCard} src="https://i.postimg.cc/Y0TyfgX7/money-transfer.png"/>
                    <h3>Transferencia Bancaria</h3>
                </div>
                <div onClick={()=>props.setScreen(3)}className={styles.boxMethod}>
                    <img className={styles.iconPayPal} src="https://i.postimg.cc/wB3fP0Sz/paypalcopy.png"/>
                    <h3>Pay Pal</h3>
                </div>
            </div>
        </>
    )

}


const mapStateToProps = (state) => {
    return {
       
    }
}
const mapDispatchToProps ={
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment)