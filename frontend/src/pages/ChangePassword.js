import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/changepassword.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import NavBar from '../components/NavBar'
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast"
import { Eye, EyeSlash } from 'react-bootstrap-icons'
const ChangePassword = (props) =>{
    const [check, setCheck] = useState(true)
    const [eye, setEye] = useState(true)
    const [userData,setUserData]=useState({
        eMail:"",
        password:""
    })
    const refPass=useRef()
    useEffect(()=>{
        props.verifyIdMail(props.match.params.id,"VERIFICAR USUARIO")
        .then(res=>{
            if(!res) props.history.push("/")
       })
       // eslint-disable-next-line
    },[])
    const notificationToast = (message, icon) => {
        return toast(message, {
          icon: icon,
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
        });
      };
    let viewPassImg = !check ? <Eye className={styles.eye}/>
    : <EyeSlash className={styles.eye}/>
    let viewPassImg1 = !eye  ? <Eye className={styles.eye}/>
    : <EyeSlash className={styles.eye}/>
    const inputHandler =(e)=>{
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
    const submit=()=>{
        let inputs=Object.values(userData).some((input)=>input==="")
        if(inputs || !userData.eMail.includes("@") ){
            notificationToast("Llena todos los campos y el mail debe ser valido","🚫")
        }else if(refPass.current.value!==userData.password){
            notificationToast("La contraseña no coincide","🚫")
        }else{
            props.changePassword(userData.eMail,userData.password)
            .then(res=>{
                if(res){
                    notificationToast("Su contraseña ha sido cambiada con exito","👏")
                    props.history.push("/")
                }else{
                    notificationToast(
                        "Hubo un problema, intente nuevamente más tarde",
                        "🚫"
                      );
                }
            })
        }
    }

    return(
        <>
            <NavBar/>
            <section className={styles.sectione}>
            <Toaster />
                <div className={styles.form}>
                    <h2>Recupera tu contraseña</h2>
                    <hr/>
                    <div className={styles.boxInputs}>
                        <input type="email" className={styles.input} placeholder="E-mail" name="eMail"  onChange={inputHandler} />
                        <div className={styles.inputPassContainer}>
                            <input
                                ref={refPass}
                                type={check ? "password" : "text"}
                                className={styles.inputTypes}
                                placeholder="Contraseña"
                                name="password"
                            />
                            <div  onClick={()=>setCheck(!check)} className={styles.imgForPass}> {viewPassImg}</div>
                        </div>
                        <div className={styles.inputPassContainer}>
                            <input
                                onChange={inputHandler}
                                type={eye ? "password" : "text"}
                                className={styles.inputTypes}
                                placeholder="Contraseña"
                                name="password"
                            />
                            <div  onClick={()=>setEye(!eye)} className={styles.imgForPass}> {viewPassImg1}</div>
                        </div>
                        <button className={styles.buttonSend} onClick={submit}>ENVIAR</button>
                    </div>                                       
                </div>
            </section>
            <Footer/>
        </>
    )
}

const mapDispatchToProps ={
    verifyIdMail: usersAction.verifyIdMail,
    changePassword:usersAction.changePassword
}
export default connect(null,mapDispatchToProps)(ChangePassword)