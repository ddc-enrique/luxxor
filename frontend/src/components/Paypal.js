import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'


const Paypal = (props) => {
    const paypal = useRef()
    let fecha = new Date()
    useEffect(() => {
        window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.PAYPAL,
            style: {
                layout:  'vertical',
                color:   'blue',
                shape:   'rect',
                label:   'paypal',
                // tagline: 'true',
            },
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {description: `Compra en Luxxor el dia ${fecha.toLocaleDateString()}`, amount: {
                            // value: props.total, currency_code: 'USD'
                            value: 10, currency_code: 'USD'
                        }},
                    ]
                })
            },
            onApprove: async (data, actions) => {
                await actions.order.capture()
                props.setScreen(3)
            },
            onError: (err) => {
                toast.error("No se pudo realizar el pago con PayPal, intente más tarde o con otro método")
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

    return (
        <div
            ref={paypal}
        >
            
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        total: state.shopCart.total
    }
}

export default connect(mapStateToProps)(Paypal)
