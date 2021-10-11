import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import styles from "../styles/stripe.module.css";
import { connect } from "react-redux";
import shopCartAction from "../redux/actions/shopCartActions";
import toast from "react-hot-toast";
import shopCartActions from "../redux/actions/shopCartActions";

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
            try {
                await props.payCart({
                    id,
                    amount: props.total * 100
                })                
                props.setPayment("Tarjet de Crédito")
                props.setScreen(3)
            } catch (error) {
                props.toast.error("No se pudo realizar el pago con tarjeta, intente más tarde o con otro método")
            }            
        }
    }  

    return( 
        <form className={styles.form} onSubmit={handleSubmit}>
                <CardElement className={styles.element}/>
                <button onClick={handleSubmit} >
                    Pagar
                </button>
        </form>)
    
}



const PaymentWithStripe = (props) => {
    return (       
        <Elements stripe={stripePromisse}>
            <PaymentCheckout payCart={props.payCart}/>
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