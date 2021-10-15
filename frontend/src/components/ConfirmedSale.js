import styles from '../styles/confirmedSale.module.css'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import usersAction from '../redux/actions/usersAction'
import shopCartActions from "../redux/actions/shopCartActions"

const ConfirmedSale = ({ id, total, shopCart, token, dataShipping, payment, sendBill,resetCart}) => {
    const [confirmedMessage, setConfirmedMessage] = useState(`Muchas gracias por su compra. En breve recibirás un mail con la información de su orden de compra.`)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const sendNewBill = async () => {
            try {
                let response = await sendBill(id, total, shopCart, dataShipping, payment, token)
                if(!response.success) setConfirmedMessage("Algo salio mal, ponganse en contacto luxxor.tech@gmail.com")
               resetCart()
            } catch (error) {
                toast.error(error)
            }
        }
        sendNewBill()
        setLoading(false)
    },[])
    
    if(loading) return <div className={styles.loading}></div>

    return (
        <div className={styles.containerConfirm}>
            <h1 className={styles.headerConfirmed}>
               {confirmedMessage}
            </h1>
            <Toaster />
        </div>
    )
}

const mapDispatchToProps = {
    sendBill: usersAction.sendNewBill,
    resetCart:shopCartActions.resetCart,
}

const mapStateToProps = (state) => {
    return{
        id: state.users.id,
        total: state.shopCart.total,
        shopCart: state.shopCart.shopCart,
        token: state.users.token
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ConfirmedSale)
