import React, { useState } from "react"
import styles from "../styles/signUp.module.css"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import { GoogleLogin} from "react-google-login"
import { Link } from "react-router-dom"
import { Carousel } from "react-carousel-minimal"
import SignIn from "../components/SignIn"

const SignUp = (props) => {
  const {signUp} = props

  const [check, setCheck] = useState(true)
  const [modalLogIn, setModalLogIn] = useState(true)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    profilePic: "",
  })

  let viewPassImg = check ? "5NX1hj01/eyeOpen.png" : "hPNgcgzm/EyeClose.png"

  const responseGoogle = (res) => {
    let newUserWithGoogle = {
      firstName: res.profileObj.givenName, 
      lastName: res.profileObj.familyName, 
      eMail: res.profileObj.email, 
      password: res.profileObj.googleId, 
      profilePic: res.profileObj.imageUrl,
      google: true,
    }
    signUp(newUserWithGoogle)
  }

  const newUserHandler = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.name === "profilePic" ? e.target.files[0] : e.target.value})
  }

  const enterNewUser = async () =>{
    const FD = new FormData()
      FD.append("firstName", newUser.firstName)
      FD.append("lastName", newUser.lastName)
      FD.append("password", newUser.password)
      FD.append("eMail", newUser.eMail)
      FD.append("profilePic", newUser.profilePic)
      await signUp(FD)
    
}

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      signUp(newUser)
    }
 }

  const data = [
    {
      image: "https://i.postimg.cc/c1fWVFXW/first-Comment.png",
      caption: "",
    },
    {
      image: "https://i.postimg.cc/1tPB45hJ/second-Comment.png",
      caption: "",
    },
    {
      image: "https://i.postimg.cc/bYS5MdY2/third-Comment.png",
      caption: "",
    },
    {
      image: "https://i.postimg.cc/9FWG9NkF/fourth-Comment.pngpng",
      caption: "",
    },
    {
      image: "https://i.postimg.cc/TwyvP9VR/fifth-Comment.png",
      caption: "",
    },
    {
      image: "https://i.postimg.cc/P5fcxyHB/sixth-Comment.png",
      caption: "",
    },
  ]

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  }
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <div className={styles.containerForm}>
            <h1>Crear cuenta</h1>
            <h2>Completa con tus datos</h2>
            <input
              onChange={newUserHandler}
              className={styles.inputTypes}
              type="text"
              placeholder="Nombre"
              name="firstName"
              defaultValue={newUser.firstName}
            />
            <input
              onChange={newUserHandler}
              type="text"
              className={styles.inputTypes}
              placeholder="Apellido"
              name="lastName"
              defaultValue={newUser.lastName}
            />
            <input
              onChange={newUserHandler}
              type="text"
              className={styles.inputTypes}
              placeholder="Correo electrónico"
              name="eMail"
              defaultValue={newUser.eMail}
              onKeyPress={keyPressHandler}
            />
            <div className={styles.inputPassContainer}>
              <input
                onChange={newUserHandler}
                type={!check ? "password" : "text"}
                className={styles.inputTypes}
                placeholder="Contraseña"
                name="password"
                defaultValue={newUser.password}
              />
              <img onClick={()=>setCheck(!check)} className={styles.imgForPass} src={`https://i.postimg.cc/${viewPassImg}`} alt="..."/>
            </div>
            <input
              onChange={newUserHandler}
              type="password"
              className={styles.inputTypes}
              placeholder="Confirmá contraseña"
              name="checkPassword"
              onKeyPress={keyPressHandler}
            />
            <label className={styles.labelInput} for="inputPhoto"><img src="https://i.postimg.cc/k4GS8rY3/61-camera-outline.gif"/>Foto de perfil</label>
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
              <button onClick={enterNewUser} className={styles.buttonSign}>Registrarme</button>
              <div className={styles.buttonGoogle}>
                <GoogleLogin 
                    clientId="791178895075-hd66p5o1uhcrj3t20lmsu0f7j1n5ol1p.apps.googleusercontent.com"
                    buttonText="Registrarme"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>

            <div className={styles.textSign}>
              <h2>Tenes cuenta?</h2>
              <Link to="#" onClick={()=>setModalLogIn(!modalLogIn)} className={styles.link}>
                <h2> Ingresar aqui</h2>
              </Link>
            </div>
          </div>
        <div className={styles.containerCarousel}>
          <h2>Testimonios de nuestros clientes</h2>
          <Carousel
            data={data}
            time={2000}
            width="42rem"
            height="25rem"
            automatic={true}
            dots={false}
            slideBackgroundColor="trasnparent"
            slideImageFit="cover"
            thumbnails={false}
            showNavBtn={false}
          />
        </div>
      </div>
      {!modalLogIn && <SignIn />}
      <Footer />
    </>
  )
}

const mapDispatchToProps = {
  signUp: usersAction.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)