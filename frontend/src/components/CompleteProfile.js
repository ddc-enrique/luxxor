import NavBar from "./NavBar"
import Footer from "./Footer"
import styles from "../styles/completeProfile.module.css"
const CompleteProfile = () => {
return(
<div>
        <NavBar/>
        <div className={styles.divContainerExito}>
                <div className={styles.divContainerCuenta}>
                        <h2>
                            Cuenta creada con <span>Éxito</span>!
                        </h2>
                        <div className={styles.divExito} style={{backgroundImage: 'url("https://i.postimg.cc/Kc3P5Hy7/Dise-o-sin-t-tulo-54.png")'}}></div>
                </div>
                <div className={styles.divContForm}>
                    <div className={styles.divExitoImg} style={{backgroundImage: 'url(https://i.postimg.cc/cJw5KL4j/Dise-o-sin-t-tulo-15.gif)'}}></div>

                    <form className={styles.formContainerExito}>
                        <h3>
                            Actualiza tus datos para poder Comprar
                        </h3>
                                <p>DNI<input className={styles.inputDni} name='dni' type= 'number' placeholder='ej 44444444'/></p>
                                <p>Teléfono<input type= 'number'name='telefono'  placeholder='ej 114587427'/></p>
                                <p>Ciudad<input className={styles.inputCiudad} name='ciudad'  type= 'text' placeholder='ej Maípu, Mendoza.'/></p>
                                <p>Dirección<input type= 'text' name='direccion'  placeholder='ej Salta 1234'/></p>
                                <p>Opcional<input type= 'text' name='opcional' placeholder='ej casa o dpto / piso'/></p>
                                <button  className={styles.buttonEnviar}>Enviar!</button>
                    </form>
                </div>
            </div>
        <Footer/>
</div>
)
}
export default CompleteProfile