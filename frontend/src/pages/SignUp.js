import React from "react"
import styles from "../styles/signUp.module.css"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

const SignUp = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <h1>Crear cuenta</h1>
          <div className={styles.textSign}>
            <h2>Tenes cuenta?</h2>
            <button className={styles.buttonSign}> Sign In</button>
          </div>
          <h2>Completa con tus datos</h2>
          <input
            // onChange={changeValue}
            className={styles.inputTypes}
            type="text"
            placeholder="First Name"
            name="firstName"
          ></input>
          <input
            // onChange={changeValue}
            type="text"
            className={styles.inputTypes}
            placeholder="Last Name"
            name="lastName"
          ></input>
          <input
            // onChange={changeValue}
            type="text"
            className={styles.inputTypes}
            placeholder="Email"
            name="eMail"
          ></input>
          <input
            // onChange={changeValue}
            type="password"
            className={styles.inputTypes}
            placeholder="Password"
            name="password"
          ></input>
          <input
            // onChange={changeValue}
            type="password"
            className={styles.inputTypes}
            placeholder="Confirm password"
            name="password"
          ></input>
          <input
            // onChange={changeValue}
            type="text"
            className={styles.inputTypes}
            placeholder="profilePic"
            name="profilePic"
          ></input>
          <div className={styles.location}>
            <button className={styles.buttonSign}>Sign Up</button>
          </div>
        </div>
        <div>COMMENTS</div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
