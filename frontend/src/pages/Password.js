import React, { useState, useRef } from "react";
import styles from "../styles/password.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import { XCircleFill } from "react-bootstrap-icons";
import toast, { Toaster } from "react-hot-toast";

const Password = (props) => {
  const [eMail, setEmail] = useState({
    eMail: "",
  });
  const [error, setError] = useState({
    error: "",
  });
  const refSpan = useRef();
  if (error.error.length === 0) {
    if (refSpan.current) {
      refSpan.current.className = `${styles.spanTransparent}`;
    }
  } else {
    if (refSpan.current) {
      refSpan.current.className = `${styles.spanRed}`;
    }
  }
  const inputHandler = (e) => {
    setEmail({
      ...eMail,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    setError({ error: "" });
    if (eMail.eMail.length === 0) {
      setError({
        error: "Debe introducir su E-mail",
      });
    } else if (!eMail.eMail.includes("@")) {
      setError({ error: "El campo debe ser un mail" });
    } else {
      props
        .sendMail(eMail.eMail)
        .then((res) => {
          if (res) {
            toast.success("E-mail enviado verifique su casilla de correo", {
              position: "top-center",
            });
            props.setmodalPass(false);
            //que se cierre el modal
          } else {
            toast.error("E-mail no registrado", {
              position: "top-center",
            });
            // notificationToast("E-mail no registrado","🚫")
          }
        })
        .catch((e) => {
          toast.error("Hubo un problema, intente nuevamente más tarde", {
            position: "top-center",
          });
        });
    }
  };

  return (
    <>
      <div className={styles.containerTotal}>
        <Toaster />
        <div className={styles.containerForm}>
          <XCircleFill
            onClick={() => {
              props.setVisible(false);
              props.setmodalPass(false);
            }}
            className={styles.iconClose}
          />
          <div className={styles.boxData}>
            <div className={styles.boxTitle}>
              <h3>Recupera tu contraseña</h3>
              <hr />
            </div>
            <div className={styles.boxEmail}>
              <p>Ingresa tu correo electronico:</p>
              <input
                type="email"
                className={styles.input}
                placeholder="E-mail"
                name="eMail"
                onChange={inputHandler}
              />
              <span ref={refSpan} className={styles.spanTransparent}>
                {" "}
                {error.error.length === 0 ? (
                  <p className={styles.pError}></p>
                ) : (
                  <p className={styles.error}>{error.error}</p>
                )}{" "}
              </span>
              <button onClick={submit} className={styles.buttonSend}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = {
  sendMail: usersAction.sendMail,
};
export default connect(null, mapDispatchToProps)(Password);
