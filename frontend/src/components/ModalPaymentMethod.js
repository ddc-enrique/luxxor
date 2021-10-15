import styles from "../styles/modalPayment.module.css"
import PaymentWithStripe from "./PaymentWithStripe"

const ModalPaymentMethod = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.paymentContainer}>
                <PaymentWithStripe
                    modalPayment={props.modalPayment} 
                    setModalPayment={props.setModalPayment} 
                    setScreen={props.setScreen} 
                    setPayment={props.setPayment}
                    toast={props.toast}
                />
                <button  className={styles.icon} onClick={()=>props.setModalPayment(!props.modalPayment)}>
                    Cancelar
                </button>
            </div>
        </div>

    )
}


export default ModalPaymentMethod