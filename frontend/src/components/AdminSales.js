import React,  { useState, useEffect}from "react";
import styles from "../styles/adminSale.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"
import toast, { Toaster } from "react-hot-toast"
import {  PlusCircle, DashCircle, X} from 'react-bootstrap-icons'
import NavBar from "./NavBar";


const AdminSale = (props) => {

    return(
        <>

        <NavBar/>
        <section className={styles.sectionTotal}>
            <div className={styles.container}>
                <h1>Ventas</h1>
                <div className={styles.containerProduct}>
                    <h2>Venta #200</h2>
                    <div>
                        <div className={styles.headerTitles}>
                            <h3>Productos</h3>
                            <h3> Cantidad</h3>
                            <h3> Subtotal</h3>
                        </div>
                        <div className={styles.boxInfoProducts}>
                            <img className={styles.imgProduct} src="https://i.postimg.cc/d00GpB7c/0482a348b54ad784fcf114bef41ca485.png"/>
                            <h3> 1 unidad/es</h3>
                            <h3> $500</h3>
                        </div>
                    </div>
                </div>
            </div>
            

        </section>
        </>
    )
}


const mapDispatchToProps = {
   
}

const mapStateToProps = (state) => {
    return{
       
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(AdminSale)