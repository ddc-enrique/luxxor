import React,  { useState, useEffect}from "react";
/* import styles from "../styles/adminSale.module.css"; */
import { connect } from "react-redux";
import productsActions from "../redux/actions/productsActions"
import toast, { Toaster } from "react-hot-toast"
import TableSale from "./TableSale"
import moment from "moment"
import { NavAdmin } from "./NavAdmin";
import styles from "../styles/admin.module.css"
import { Link } from "react-router-dom";




const AdminSale = (props) => {
    const [sales,setSales]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(props.token){
            props.productsSold(props.token)
            .then(res=>{
                if(!res.success){
                toast("Problemas tecnicos", {
                    icon: "🚫",
                    style: {
                      borderRadius: "1rem",
                      background: "#fff",
                      color: "#545454",
                    }
                })
            }else{    
             setSales(res.response)
             setLoading(false)
            }             
        })
        .catch(e=>{
            toast("Problemas tecnicos", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                }
            })
            
        })

        }
        
    },[props.token])

    return(
        <>
            <div className={styles.divContainer}>

            <header className={styles.headerAdmin}>
                <Link to="/">
                    <h1>
                    Lu<span className={styles.orange}>x</span>
                    <span className={styles.violet}>x</span>or
                    </h1>
                </Link>
            </header>
            <div className={styles.containerAdmin}>
                <NavAdmin/>
            <section className={styles.sectionTotal}>
                <div className={styles.container}>
                    <h1>Ventas</h1>
                    {
                        sales.map((item,index)=>{
                            return(
                                <div key={item._id} className={styles.containerProduct}>
                              
                                    <h2>Orden: #{item.numberOrder} </h2>
                                    <h3>Fecha: {moment(item.date).format("DD/MM/YYYY")}</h3>
                                    <div>
                                        <TableSale shopCart={item.shopCart} amount={item.amount} saleId={item._id}/>                                  
                                    </div>
                                </div>
                            )                   
                        })
                    }
                    
                </div>
            </section>
            <Toaster position="top-center" reverseOrder={false} />
            </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return{
        token: state.users.token
    }
}

const mapDispatchToProps = {
    productsSold: productsActions.productsSold
}




export default connect (mapStateToProps, mapDispatchToProps)(AdminSale)