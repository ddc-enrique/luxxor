import {useState} from "react"
import { GoogleLogin} from "react-google-login"
import styles from "../styles/signIn.module.css"


const SignIn = () => {

    const [check, setCheck] = useState(true)
    const [userLog, setUserLog] = useState({
        eMail: "",
        password: ""
    })
    let viewPassImg = check ? "5NX1hj01/eyeOpen.png" : "hPNgcgzm/EyeClose.png"

    const enterUser = () =>{
        console.log("Me registro")
    }
    
    const responseGoogle = (res)=>{
        let logUserWithGoogle ={
            eMail: res.profileObj.email,
            password: res.profileObj.googleId,
            google: true
        }
        setUserLog(logUserWithGoogle)
    }

        
    const userLoginHandler = (e) => {
        setUserLog({...userLog, [e.target.name]: e.target.value})
    }

    return (
        <>
        <button type="button"  data-toggle="modal" data-target="#windowAdd">
            Sign Up
        </button>
            
            <div id="windowAdd" className={styles.modal}>
            <div className={styles.windowPopUp}>
                <a href="#Home" style={{textDecoration: 'none'}}>
                    X
                </a>
                    <div style={{backgroundColor: "#EFEAEA", width: "29rem", height: "24rem"}}>
                        <h1>Sign In</h1>
                        <div style={styles.inputContain}>
                            <input type="email" className={styles.input} placeholder="Ingrese su email" name="eMail" defaultValue={userLog.eMail} onChange={userLoginHandler}/>
                            <div className={styles.inputPassContainer}>
                                <input className={styles.inputPass} type={!check ? "password" : "text"} placeholder="Ingrese su contraseña" name="password" defaultValue={userLog.password} onChange={userLoginHandler}/>
                                <img onClick={()=>setCheck(!check)} className={styles.imgForPass} src={`https://i.postimg.cc/${viewPassImg}`} alt="..."/>
                            </div>
                            <button className={styles.buttonSign} onClick={enterUser}>Entrar</button>
                        </div>
                        <GoogleLogin 
                            clientId="791178895075-hd66p5o1uhcrj3t20lmsu0f7j1n5ol1p.apps.googleusercontent.com"
                            buttonText="Ingresar con Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                    </div>
            </div>  
        </div>
        </>
    )
}

export default SignIn



    

       

