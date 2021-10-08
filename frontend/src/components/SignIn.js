import {useState, useContext} from "react"
import { GoogleLogin} from "react-google-login"
import styles from "../styles/signIn.module.css"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import usersAction from "../redux/actions/usersAction"

const SignIn = (props) => {
    const {signIn} = props  
    const [check, setCheck] = useState(true)
    
    const [userLog, setUserLog] = useState({
        eMail: "",
        password: ""
    })
    let viewPassImg = !check ? "5NX1hj01/eyeOpen.png" : "hPNgcgzm/EyeClose.png"

    const enterUser = () =>{
        signIn(userLog)
    }
    
    const responseGoogle = async (res)=>{
        let logUserWithGoogle ={
            eMail: res.profileObj.email,
            password: res.profileObj.googleId,
            google: true
        }
        try {
           let response = await signIn(logUserWithGoogle)
           if (!response){
               console.log("Error")
           }else{
                console.log("Bien")
           }
        }catch(e){
            console.log(e)
        }

    }

    
    const userLoginHandler = (e) => {
        setUserLog({...userLog, [e.target.name]: e.target.value})
    }

    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
           enterUser()
        }
     }
    const clickModalPass=()=>{
        props.setModalLogIn(!props.modalLogIn)
        props.setmodalPass(true)
     } 

    return (
        <>
            <div className={styles.container}>
                <div className={styles.signContainer}>
                    <img className={styles.icono} onClick={()=>{
                        props.setVisible(false)
                         props.setModalLogIn(!props.modalLogIn)}} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/>
                    <h1>Iniciá sesion</h1>
                    <div className={styles.inputContainer}>
                        <input type="email" className={styles.input} placeholder="Ingrese su email" name="eMail" defaultValue={userLog.eMail} onChange={userLoginHandler} onKeyPress={keyPressHandler}/>
                        <div className={styles.inputPassContainer}>
                            <input className={styles.inputPass} type={check ? "password" : "text"} placeholder="Ingrese su contraseña" name="password" defaultValue={userLog.password} onChange={userLoginHandler} onKeyPress={keyPressHandler}/>
                            <img onClick={()=>setCheck(!check)} className={styles.imgForPass} src={`https://i.postimg.cc/${viewPassImg}`} alt="..."/>
                        </div>
                        <button className={styles.buttonSign} onClick={enterUser}>Entrar</button>
                    </div>
                    <div className={styles.buttonGoogle}>
                        <GoogleLogin 
                            clientId="791178895075-hd66p5o1uhcrj3t20lmsu0f7j1n5ol1p.apps.googleusercontent.com"
                            buttonText="Ingresar"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            
                        />
                    </div>
                    <div className={styles.textSign}>
                        <h2>No tenés cuenta? <Link to="/registro"></Link>Registráte </h2>                       
                    </div>
                    <div className={styles.textPass}>
                        <h5 onClick={clickModalPass}>Olvide mi contraseña</h5>                       
                    </div>
                    
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    signIn: usersAction.signIn
}

export default connect(null, mapDispatchToProps)(SignIn)





