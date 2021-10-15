import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import styles from "../styles/stripe.module.css";
import { connect } from "react-redux";
import shopCartAction from "../redux/actions/shopCartActions";
import toast from "react-hot-toast";
import shopCartActions from "../redux/actions/shopCartActions";
import PhotoCard from "./PhotoCard";

const stripePromisse = loadStripe("pk_test_51Jj1qDLyz3SCpT0O3dmugpTo4iA2C78CtOPdxQlVspZixLw1sOHMezxnQrmRJCQKUtocOMDMizxW3YraU9Rli0KL00RpThZaav")


const PaymentCheckout = (props) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if(!error){
            const {id} = paymentMethod
               props.payCart({
                    id,
                    amount: props.total*100
                }).then(response => {
                    if(!response.success) throw new Error("No se pudo realizar el pago. Intente mas tarde, o use otro método.")
                    props.setPayment("Tarjeta de Crédito")
                    props.setScreen(3)
                }).catch((e)=>toast.error(e.message))
        }
    }  

    return( 
        <form className={styles.form} onSubmit={handleSubmit}>
                <PhotoCard/>
                <CardElement className={styles.element} />
                <button onClick={handleSubmit} className={styles.button}>
                    Pagar
                </button>
        </form>)
    
}

const PaymentWithStripe = (props) => {
    return (       
        <Elements stripe={stripePromisse}>
            <PaymentCheckout total={props.total} setPayment={props.setPayment} setScreen={props.setScreen} payCart={props.payCart}/>
        </Elements>
    )
}

const mapDispatchToProps = {
    payCart: shopCartAction.payCart,
    resetCart:shopCartActions.resetCart,
}

const mapStateToProps = (state) => {
    return{
        total: state.shopCart.total
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentWithStripe)