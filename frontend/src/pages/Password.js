import React,  { useState, useRef }from "react";
import styles from "../styles/password.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import {  XCircleFill } from 'react-bootstrap-icons'

const Password = (props) =>{
    const [eMail,setEmail]=useState({
        eMail:""
    })
    const [error,setError]=useState({
        error:""
    })
    const refSpan = useRef()
    
   if(error.error.length===0){
       if(refSpan.current){
           refSpan.current.className=`${styles.spanTransparent}`
        }
     
    }else{
        if(refSpan.current){
            refSpan.current.className=`${styles.spanRed}`
        }      
    } 
    const inputHandler=(e)=>{
        setEmail({
            ...eMail,
            [e.target.name]:e.target.value
        })
    }
    const submit=()=>{
        setError({error:""})
        if(eMail.eMail.length===0){
            setError({
                error:"Debe introducir su E-mail"
            })
        }
        else if(!eMail.eMail.includes('@')){
            setError({error:"El campo debe ser un mail"})
        }else{
            props.sendMail(eMail.eMail)
            .then(res=>{
                console.log(res)
                if(res){
                    alert("E-mail enviado verifique su casilla de correo")
                    //que se cierre el modal
                }else{
                    alert("E-mail no registrado")
                }
            })
            .catch(e=>console.log(e))           
        }
    }
    
    return(
        <>
            <div className={styles.containerTotal}>
                <div className={styles.containerForm}>
                    {/* <img onClick={()=>{
                        props.setVisible(false)
                        props.setmodalPass(false)}} className={styles.iconClose} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/> */}
                          <XCircleFill  onClick={()=>{
                        props.setVisible(false)
                        props.setmodalPass(false)}} className={styles.iconClose}  className={styles.icono}/>
                    <div className={styles.boxData} >
                        <div className={styles.boxTitle} >
                            <h3>Recupera tu contraseña</h3>
                            <hr/>
                        </div>
                        <div className={styles.boxEmail}>
                        <p>Ingresa tu correo electronico:</p>
                        <input type="email" className={styles.input} placeholder="E-mail" name="eMail"  onChange={inputHandler} />
                        <span ref={refSpan} className={styles.spanTransparent}> {error.error.length===0 ? "." : error.error} </span>
                        <button onClick={submit} className={styles.buttonSend}>Enviar</button>
                        </div>
                    </div>
                    
                </div>        
            </div>
        </>
    )
    
}
const mapDispatchToProps ={
    sendMail: usersAction.sendMail
}
export default connect(null,mapDispatchToProps)(Password)
