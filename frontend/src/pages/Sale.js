import React,  { useState, useEffect }from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import NavBar from "../components/NavBar";
import toast, { Toaster } from "react-hot-toast"
import CardProductCart from "../components/CardProductCart";
import CheckOutProducts from "../components/CheckOutProducts";
import Payment from "../components/Payment";
import ConfirmedSale from "../components/ConfirmedSale";

const Sale = (props) =>{
    const [payment,setPayment]= useState(false)
    const[screen,setScreen]=useState(1)
    useEffect(()=>{
        window.scrollTo(0,0)
        if(!props.dni){
            toast("Completa tu perfil para finalizar la compra", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                },
            })
            /* props.history.push("/mi-cuenta")   */
        }

    })
    let componentToRender
    switch(screen){
        case 1:
            componentToRender= <CheckOutProducts setScreen= {setScreen} />
            break
        case 2:
            componentToRender= <Payment setScreen={setScreen} setPayment={setPayment} toast={toast}/>
            break
        case 3:
            componentToRender= <ConfirmedSale payment={payment}/>
            break 

    }

    return(
        <>
            <NavBar/>
            <section className={styles.sectionSale}>             
            <div className={styles.navCarrito}>
                <div>
                    <p>Paso 1</p> 
                </div>
                <div>
                    <p>Paso 2</p> 
                </div>
                <div>
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
    }
}
const mapDispatchToProps ={
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Sale)

/* {!clickBuy ? <CheckOutProducts setClickBuy= {setClickBuy}/> : <Payment setPayment={setPayment}/>} */