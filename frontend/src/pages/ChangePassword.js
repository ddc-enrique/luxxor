import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/changepassword.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import NavBar from '../components/NavBar'
import Footer from "../components/Footer";

const ChangePassword = (props) =>{
    const [check, setCheck] = useState(true)
    const [userData,setUserData]=useState({
        eMail:"",
        password:""
    })
    const refPass=useRef()
    useEffect(()=>{
        props.verifyId(props.match.params.id)
        .then(res=>{
            if(!res) props.history.push("/")
       })
    },[])
    let viewPassImg = !check ? "5NX1hj01/eyeOpen.png" : "hPNgcgzm/EyeClose.png"
    const inputHandler =(e)=>{
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
    const submit=()=>{
        let inputs=Object.values(userData).some((input)=>input==="")
        if(inputs || !userData.eMail.includes("@") ){
            alert("Llena todos los campos y el mail debe ser valido")
        }else if(refPass.current.value!==userData.password){
            alert("la contraseña no coincide")
        }else{
            //action
        }
    }

    return(
        <>
            <NavBar/>
            <section className={styles.sectione}>
                <div className={styles.form}>
                    <h2>Recupera tu contraseña</h2>
                    <hr/>
                    <div className={styles.boxInputs}>
                        <p>Ingresa tu correo electronico:</p>
                        <input type="email" className={styles.input} placeholder="E-mail" name="eMail"  onChange={inputHandler} />
                        <div className={styles.inputPassContainer}>
                            <input
                                ref={refPass}
                                type={check ? "password" : "text"}
                                className={styles.inputTypes}
                                placeholder="Contraseña"
                                name="password"
                            />
                            <img onClick={()=>setCheck(!check)} className={styles.imgForPass} src={`https://i.postimg.cc/${viewPassImg}`} alt="..."/>
                        </div>
                        <div className={styles.inputPassContainer}>
                            <input
                                onChange={inputHandler}
                                type={check ? "password" : "text"}
                                className={styles.inputTypes}
                                placeholder="Contraseña"
                                name="password"
                            />
                            <img onClick={()=>setCheck(!check)} className={styles.imgForPass} src={`https://i.postimg.cc/${viewPassImg}`} alt="..."/>
                        </div>
                    </div>
                    <button onClick={submit}>ENVIAR</button>
                    
                </div>
            </section>
            <Footer/>
        </>
    )
}

const mapDispatchToProps ={
    verifyId: usersAction.verifyId
}
export default connect(null,mapDispatchToProps)(ChangePassword)