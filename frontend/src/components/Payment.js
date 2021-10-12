import React,  { useState, useEffect}from "react";
import styles from "../styles/payment.module.css";
import { connect } from "react-redux";
import ModalPaymentMethod from "./ModalPaymentMethod"
import Paypal from "./Paypal"
import {  CashStack, CreditCard, Receipt } from 'react-bootstrap-icons'
import shopCartActions from "../redux/actions/shopCartActions"
const Payment = (props) =>{
    const [modalPayment, setModalPayment] = useState(false)

    const chooseCash = () => {
        props.setPayment("Efectivo")
        props.setScreen(3)
    }

    return(
        <>
            <h3 className={styles.title}>SELECCIONA UN METODO DE PAGO:</h3>
            <div className={styles.container}>
                {true && <div onClick={chooseCash} className={styles.boxMethod}>
                <CashStack  className={styles.iconCard}/>
                    {/* <img className={styles.iconCard} src="https://i.postimg.cc/PqzxgQZ6/money.png"/> */}
                    <h3>Contado Efectivo</h3>
                </div>}
                {/* HABILITAR SI SOLO EL ENVIO ES SOLO POR RETIRO EN LOCAL */}
                <div onClick={()=>props.setScreen(3)}className={styles.boxMethod}>
                <Receipt  className={styles.iconCard}/>
                    {/* <img className={styles.iconCard} src="https://i.postimg.cc/Y0TyfgX7/money-transfer.png"/> */}
                    <h3>Transferencia Bancaria</h3>
                </div>
                <div className={styles.boxMethod} >
                    <Paypal
                        setScreen={props.setScreen} 
                        setPayment={props.setPayment}
                        toast={props.toast}
                    />
                </div>
                <div onClick={()=>setModalPayment(!modalPayment)} className={styles.boxMethod}>
                <CreditCard  className={styles.iconCard}/>
                    {/* <img className={styles.iconPayPal} src="https://www.ayudamercadopago.com.ar/img/tarjeta.credito.png"/> */}
                    <h3>Tarjetas</h3>
                </div>
                {modalPayment &&  
                    <ModalPaymentMethod 
                        modalPayment={modalPayment} 
                        setModalPayment={setModalPayment} 
                        setScreen={props.setScreen} 
                        setPayment={props.setPayment}
                        toast={props.toast}
                    />}
            </div>
        </>
    )

}


const mapStateToProps = (state) => {
    return {
       
    }
}
const mapDispatchToProps ={
    resetCart:shopCartActions.resetCart,
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment)