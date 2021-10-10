import styles from "../styles/modalPayment.module.css"
import PaymentWithStripe from "./PaymentWithStripe"

const ModalPaymentMethod = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.paymentContainer}>
            <img className={styles.icono} onClick={()=>{
                 props.setModalPayment(!props.modalPayment)}} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/>
                <PaymentWithStripe/>
            </div>
        </div>

    )
}

export default ModalPaymentMethod