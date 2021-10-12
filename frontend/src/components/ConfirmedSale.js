import styles from '../styles/confirmedSale.module.css'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import usersAction from '../redux/actions/usersAction'

const ConfirmedSale = ({ id, total, shopCart, token, shipping, payment, sendBill}) => {
    const [confirmedMessage, setConfirmedMessage] = useState("Muchas gracias por su compra")
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const sendNewBill = async () => {
            try {
                let response = await sendBill(id, total, shopCart, true, payment, token)
                if(!response.success) setConfirmedMessage("Algo salio mal, ponganse en contacto luxxor.tech@gmail.com")
            } catch (error) {
                toast.error(error)
            }
        }
        sendNewBill()
        setLoading(false)
    },[])
    
    if(loading) return <div className={styles.loading}></div>
    // <div>LOADING...</div>

    return (
        <div>
            <h1
                className={styles.headerConfirmed}
            >
               {confirmedMessage}
            </h1>

        </div>
    )
}

const mapDispatchToProps = {
    sendBill: usersAction.sendNewBill
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
