import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/password.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";


const Banned = (props) =>{
    useEffect(()=>{
        console.log(props.match.params.id)
        props.verifyIdMail(props.match.params.id)
        .then(res=>{
            if(!res){
               props.history.push("/") 
            }else{
                props.banAccount(props.match.params.id)
            }
       })
    },[])
    return(
        <>
        <h1>Te banneo</h1>
        <h2>Cuenta bloqueada con exito</h2>
        </>
    )
}
const mapDispatchToProps ={
    verifyIdMail: usersAction.verifyIdMail,
    banAccount: usersAction.banAccount
}
export default connect(null,mapDispatchToProps)(Banned)