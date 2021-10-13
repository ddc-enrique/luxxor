import styles from "../styles/modalPayment.module.css"
import PaymentWithStripe from "./PaymentWithStripe"
import { connect } from "react-redux"

const ModalPaymentMethod = (props) => {
    console.log(props)
    return (
        <div className={styles.container}>
            <div className={styles.paymentContainer}>
            <img className={styles.icono} onClick={()=>{
                 props.setModalPayment(!props.modalPayment)}} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png" alt="..."/>

                <PaymentWithStripe
                    modalPayment={props.modalPayment} 
                    setModalPayment={props.setModalPayment} 
                    setScreen={props.setScreen} 
                    setPayment={props.setPayment}
                    toast={props.toast}
                />
            </div>
        </div>

    )
}


export default ModalPaymentMethod