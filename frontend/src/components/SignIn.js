import { useState } from "react"
import { GoogleLogin } from "react-google-login"
import styles from "../styles/signIn2.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import toast from "react-hot-toast"
import {  XCircleFill,Eye, EyeSlash } from 'react-bootstrap-icons'
import { useHistory } from "react-router"
const SignIn = (props) => {
  const { signIn } = props
  const [check, setCheck] = useState(true)
  const [errorEmail, setErrorEmail] = useState(null)
  const history = useHistory()

  const [userLog, setUserLog] = useState({
    eMail: "",
    password: "",
  })
  let viewPassImg = !check ? <Eye className={styles.eye}/> : <EyeSlash className={styles.eye}/>

  const enterUser = async () => {
    try {
      if (userLog.eMail === "" || userLog.password === "") {
        toast.error("Completa todos los campos", {
          position: "top-center",
        })
      } else {
        const response = await signIn(userLog)
        if (response === "Email y/o contraseña incorrectos" ||  response === 'Por favor usar Google') {
          toast.error(response, {
            position: "top-center",
          })
          return null
        }

        if (response) {
          setErrorEmail(
            response.find((err) => err.path[0] === "eMail")
              ? response.find((err) => err.path[0] === "eMail").message
              : null
          )
        } else {
          toast.success("Bienvenido", {
            position: "top-center",
          })
          props.setModalLogIn(false)
          history.push("/")
        }
      }
    } catch (error) {
        toast.error(error, {
            position: "top-center",
          })
    }
  }

  const responseGoogle = async (res) => {
    let logUserWithGoogle = {
      eMail: res.profileObj.email,
      password: res.profileObj.googleId,
      google: true,
    }
    try {
      let response = await signIn(logUserWithGoogle)
      if (!response) {
        toast.success("Bienvenido", {
            position: "top-center",
          })
        props.setModalLogIn(!props.modalLogIn)
      }
    } catch (e) {
        toast.error(e, {
            position: "top-center",
          })
    }
  }

  const userLoginHandler = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value })
  }

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      enterUser()
    }
  }
  const clickModalPass = () => {
    props.setModalLogIn(!props.modalLogIn)
    props.setmodalPass(true)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.signContainer}>
           <XCircleFill  onClick={() => {
              props.setVisible(false)
              props.setModalLogIn(!props.modalLogIn)
            }} className={styles.icono}/>
          <h1>Iniciá sesion</h1>
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              placeholder="Ingrese su email"
              name="eMail"
              defaultValue={userLog.eMail}
              onChange={userLoginHandler}
              onKeyPress={keyPressHandler}
            />
            <small style={{ color: "yellow", fontWeight: "bold" }}>
              {errorEmail}&nbsp;
            </small>
            <div className={styles.inputPassContainer}>
              <input
                className={styles.inputPass}
                type={check ? "password" : "text"}
                placeholder="Ingrese su contraseña"
                name="password"
                defaultValue={userLog.password}
                onChange={userLoginHandler}
                onKeyPress={keyPressHandler}
              />
              
              <div  onClick={() => setCheck(!check)}> {viewPassImg}</div>
            </div>
            <button className={styles.buttonSign} onClick={enterUser}>
              Entrar
            </button>
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
            <h2>
              No tenés cuenta? <Link to="/registro"><span style={{color:'white',fontSize:'1.35rem'}}>Registráte</span></Link>{" "}
            </h2>
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
  signIn: usersAction.signIn,
}

export default connect(null, mapDispatchToProps)(SignIn)
