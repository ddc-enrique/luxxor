import React,  { useState, useEffect}from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"

const CheckOutProducts = (props) =>{

    return(
        <>       
            
            <div className={styles.containerCart}>
                <CardProductCart sale={true}/>
                <CardProductCart sale={true}/>
            </div>
            <div className={styles.formData}>
                <h3>DATOS DEL DESTINATARIO</h3>
                <div className={styles.boxInputs}>
                    <input type="text"  name="firstName" placeholder="Nombre" />
                    <input type="text"  name="lastName" placeholder="Apellido" />
                </div>
                <div className={styles.boxInputs}>
                    <input type="text"  name="dni" placeholder="DNI" />
                    <input type="text"  name="phone" placeholder="Teléfono" />                       
                </div>
            </div>
            <div className={styles.formData}>
                <h3>DIRECCION DE ENTREGA</h3>
                <div className={styles.boxInputs}>
                    <input type="text"  name="adress" placeholder="Dirección" />
                    <input type="text"  name="zipCode" placeholder="Departamento(opcional)" />
                </div>
                <div className={styles.boxInputs}>
                    <input type="text"  name="city" placeholder="Ciudad" />
                    <input type="number"  name="zipCode" placeholder="Código Postal" />
                </div>
            </div>
            <div className={styles.containerTotal}>
                <h3>TOTAL: $$$$</h3>
            </div>

            <div className={styles.containerSend}>
                <button onClick={()=>props.setScreen(2)} className={styles.buttonSend}>Continuar Compra</button>
            </div>
        </>
    )

}


const mapStateToProps = (state) => {
    return {
       
    }
}
const mapDispatchToProps ={
    
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckOutProducts)