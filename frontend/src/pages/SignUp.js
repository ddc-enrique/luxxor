import React, { useState } from "react"
import styles from "../styles/signUp.module.css"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom"
import SignIn from "../components/SignIn"
import toast, { Toaster } from "react-hot-toast"
import Password from "./Password"
import {  XCircleFill,Eye, EyeSlash } from 'react-bootstrap-icons'

const SignUp = (props) => {
  const { signUp } = props
  const [visible, setVisible] =useState(false)
  const [check, setCheck] = useState(true)
  const [checkConfirm, setCheckConfirm] = useState(true)
  const [modalPass,setmodalPass]=useState(false)

  const [modalLogIn, setModalLogIn] = useState(true)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    profilePic: "",
  })
  const [errorName, setErrorName] = useState(null)
  const [errorLastName, setErrorLastName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPass, setErrorPass] = useState(null)
  const [errorPassChecked, setErrorPassCkecked] = useState(null)

  let viewPassImg = !check ? <Eye className={styles.eye}/> : <EyeSlash className={styles.eye}/>
  let viewPassImgConfirm = !checkConfirm
    ? <Eye className={styles.eye}/>
    : <EyeSlash className={styles.eye}/>

  const responseGoogle = async (res) => {
    try{
      let newUserWithGoogle = {
        firstName: res.profileObj.givenName,
        lastName: res.profileObj.familyName,
        eMail: res.profileObj.email,
        password: res.profileObj.googleId,
        profilePic: res.profileObj.imageUrl,
        google: true,
      }
      
      const response = await signUp(newUserWithGoogle)
      if(response === 'Usuario ya registrado'){
        toast("Usuario ya registrado", {
          icon: "🚫",
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
        })
      }
    }catch(error){

    }
    
  }

  const newUserHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]:
        e.target.name === "profilePic" ? e.target.files[0] : e.target.value,
    })
  }

  const enterNewUser = async () => {
    try {
      const FD = new FormData()
      FD.append("firstName", newUser.firstName)
      FD.append("lastName", newUser.lastName)
      FD.append("password", newUser.password)
      FD.append("eMail", newUser.eMail)
      FD.append("profilePic", newUser.profilePic)

      if (
        Object.values(newUser).some((value) => value === "") ||
        newUser.checkPassword === ""
      ) {
        toast("Completa todos los campos", {
          icon: "🚫",
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
        })
      } else if (newUser.checkPassword !== newUser.password) {
        setErrorPassCkecked("No coinciden... vuelve a intentarlo")
      } else {
        const resp = await signUp(FD)
        if (resp) {
          setErrorName(
            resp.find((err) => err.path[0] === "firstName")
              ? resp.find((err) => err.path[0] === "firstName").message
              : null
          )
          setErrorLastName(
            resp.find((err) => err.path[0] === "lastName")
              ? resp.find((err) => err.path[0] === "lastName").message
              : null
          )
          setErrorEmail(
            resp.find((err) => err.path[0] === "eMail")
              ? resp.find((err) => err.path[0] === "eMail").message
              : null
          )

          setErrorPass(
            resp.find((err) => err.path[0] === "password")
              ? resp.find((err) => err.path[0] === "password").message
              : null
          )
        } else {
          toast("Bienvenido", {
            icon: "👏",
            style: {
              borderRadius: "1rem",
              background: "#f48f31",
              color: "#fff",
            },
          })
          props.history.push("/")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      enterNewUser()
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <div className={styles.containerCarousel}>
        <div className={styles.image}></div>
        </div>
        <div className={styles.containerForm}>
          <h1>REGISTRATE</h1>
          <input
            onChange={newUserHandler}
            className={styles.inputTypes}
            type="text"
            placeholder="Nombre"
            name="firstName"
            defaultValue={newUser.firstName}
          />
          <small style={{color: "yellow",fontWeight:'bold'}}>{errorName}&nbsp;</small>
          <input
            onChange={newUserHandler}
            type="text"
            className={styles.inputTypes}
            placeholder="Apellido"
            name="lastName"
            defaultValue={newUser.lastName}
          />
          <small style={{color: "yellow",fontWeight:'bold'}}>{errorLastName}&nbsp;</small>
          <input
            onChange={newUserHandler}
            type="text"
            className={styles.inputTypes}
            placeholder="Correo electrónico"
            name="eMail"
            defaultValue={newUser.eMail}
            onKeyPress={keyPressHandler}
          />
          <small style={{color: "yellow",fontWeight:'bold'}}>{errorEmail}&nbsp;</small>
          <div className={styles.inputPassContainer}>
            <input
              onChange={newUserHandler}
              type={check ? "password" : "text"}
              className={styles.inputTypes}
              placeholder="Contraseña"
              name="password"
              defaultValue={newUser.password}
            />
             <div onClick={() => setCheck(!check)}> {viewPassImg}</div>
          </div>
          <small style={{color: "yellow",fontWeight:'bold'}}>{errorPass}&nbsp;</small>
          <div className={styles.inputPassContainer}>
            <input
              onChange={newUserHandler}
              type={checkConfirm ? "password" : "text"}
              className={styles.inputTypes}
              placeholder="Confirmar contraseña"
              name="checkPassword"
              onKeyPress={keyPressHandler}
            />
            <div  onClick={() => setCheckConfirm(!checkConfirm)}> {viewPassImgConfirm}</div>
          </div>
          <small style={{color: "yellow",fontWeight:'bold'}}>{errorPassChecked}&nbsp;</small>
          {newUser.profilePic && <p>{newUser.profilePic.name}</p>}
          <label className={styles.labelInput} for="inputPhoto">
            <div className={styles.photo}> Foto de perfil</div>
          </label>
          <input
            id="inputPhoto"
            onChange={newUserHandler}
            type="file"
            className={styles.inputPhoto}
            placeholder="Foto de perfil"
            name="profilePic"
            defaultValue={newUser.profilePic}
          />
          <div className={styles.location}>
            <button onClick={enterNewUser} className={styles.btnSign}>
              Registrarme
            </button>
            <div className={styles.buttonGoogle}>
              <GoogleLogin
                clientId="791178895075-hd66p5o1uhcrj3t20lmsu0f7j1n5ol1p.apps.googleusercontent.com"
                buttonText="Registrarme con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>

          <div className={styles.textSign}>
            <h2>Tenes cuenta?</h2>
            <Link
              to="#"
              onClick={() => setModalLogIn(!modalLogIn)}
              className={styles.link}
            >
              <h2> Ingresar aqui</h2>
            </Link>
          </div>
        </div>
        
      </div>
      {!modalLogIn && <SignIn modalLogIn={modalLogIn} setModalLogIn={setModalLogIn} setmodalPass={setmodalPass} setVisible={setVisible} />}
      {modalPass && <Password setmodalPass={setmodalPass} setVisible={setVisible}/>}
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

const mapDispatchToProps = {
  signUp: usersAction.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)
