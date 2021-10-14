import React,  { useState, useEffect }from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import toast, { Toaster } from "react-hot-toast"
import CheckOutProducts from "../components/CheckOutProducts";
import Payment from "../components/Payment";
import ConfirmedSale from "../components/ConfirmedSale";

const Sale = (props) =>{
    const [payment,setPayment]= useState(false)
    const[screen,setScreen]=useState(1)
    useEffect(()=>{
        window.scrollTo(0,0)
        if(!props.token){
            toast("Deberas loguearte para finaliza la compra", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                },
            })
            props.history.push("/registro")   
        }
        if(!props.dni){
            toast("Completa tu perfil para finalizar la compra", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                },
            })
            props.history.push("/mi-cuenta")   
        }

    })
    let componentToRender
    switch(screen){
        case 1:
            componentToRender= <CheckOutProducts setScreen={setScreen} />
            break
        case 2:
            componentToRender= <Payment setScreen={setScreen} setPayment={setPayment} toast={toast}/>
            break
        case 3:
            componentToRender= <ConfirmedSale payment={payment}/>
            break 
        default:
            break
    }
    const changeMenuHandler=()=>{
        if(screen===2){
            setScreen(1)
        }
    }

    return(
        <>
            <NavBar/>
            <section className={styles.sectionSale}>             
            <div className={styles.navCarrito}>
                <div onClick={changeMenuHandler} style={{borderBottomColor: screen === 1 && 'grey'}}>
                    <p>Paso 1</p> 
                </div>
                <div style={{borderBottomColor: screen === 2 && 'grey'}}>
                    <p>Paso 2</p> 
                </div>
                <div style={{borderBottomColor: screen === 3 && 'grey'}}>
                    <p>Paso 3</p> 
                </div>              
            </div>
            {componentToRender}
            
        </section>
    
            
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )

}


const mapStateToProps = (state) => {
    return {
        dni: state.users.dni,     
        token:state.users.token, 
    }
}
const mapDispatchToProps ={
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Sale)

/* {!clickBuy ? <CheckOutProducts setClickBuy= {setClickBuy}/> : <Payment setPayment={setPayment}/>} */