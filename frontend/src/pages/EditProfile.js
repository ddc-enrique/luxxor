import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import usersAction from "../redux/actions/usersAction"
import styles from "../styles/editProfile.module.css"
import toast, { Toaster } from 'react-hot-toast';


const EditProfile = ({ completeAccount, id, getAddressAndPhone, token }) => {
    let initialDataUser = completeAccount ? { firstName: "", lastName: "", city: "", zipCode: "", address: "", optional: "", phone: "" }
        : { dni: null, city: "", zipCode: "", address: "", optional: "", phone: "" }
    // if(completeAccount){
    //     initialDataUser = { firstName: "", lastName: "", city: "", zipCode: "", address: "", optional: "", phone: "" }
    // } else {
    //     initialDataUser = { dni: null, city: "", zipCode: "", address: "", optional: "", phone: "" }
    // }    
    const [dataUser, setDataUser] = useState({ initialDataUser })

    useEffect( () => {
        const getDataUser = async () => {
            try{
                let extraData = await getAddressAndPhone(id, token)
            } catch(err) {
                toast.error(err.message)
            }
        }
        if(completeAccount) getDataUser()

        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const inputHandler = e => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value})
    }

    const sendData = e => {
        e.preventDefault()
    }

    return(
        <div>
            <NavBar />
            <div className={styles.divContainerExito}>
                    <div className={styles.divContainerCuenta}>
                            <h2>
                                {completeAccount && "Puedes editar estos datos de tu cuenta"}
                                {!completeAccount && "Actualiza tus datos para poder Comprar"}
                                {/* Cuenta creada con <span>Éxito</span>! */}
                            </h2>
                            <div className={styles.divExito} style={{backgroundImage: 'url("https://i.postimg.cc/Kc3P5Hy7/Dise-o-sin-t-tulo-54.png")'}}></div>
                    </div>
                    <div className={styles.divContForm}>
                        <div className={styles.divExitoImg} style={{backgroundImage: 'url(https://i.postimg.cc/cJw5KL4j/Dise-o-sin-t-tulo-15.gif)'}}></div>
                        <form className={styles.formContainerExito}>
                            {/* <h3>
                                Actualiza tus datos para poder Comprar
                            </h3> */}
                            {!completeAccount  && 
                                <div class="field">
                                    <p>DNI
                                        <input 
                                            className={styles.inputDni} name='dni' type= 'number' placeholder='ej 44444444'
                                            defaultValue={dataUser.dni}
                                            onChange={inputHandler}
                                        />
                                    </p>
                                    <p className="error"></p>
                                </div>
                            }
                            {completeAccount  && 
                                <div class="field">
                                    <p>Nombre
                                        <input 
                                            name='firstName' type= 'text' placeholder='ej Juan'
                                            defaultValue={dataUser.firstName}
                                            onChange={inputHandler}
                                        />
                                    </p>
                                    <p className="error"></p>
                                </div>
                            }
                            {completeAccount  && 
                                <div class="field">
                                    <p>Apellido
                                        <input 
                                            name='lastName' type= 'text' placeholder='ej Garcia'
                                            defaultValue={dataUser.lastName}
                                            onChange={inputHandler}
                                        />
                                    </p>
                                    <p className="error"></p>
                                </div>
                            }
                            <div class="field">
                                <p>Teléfono
                                    <input 
                                        type= 'number'name='phone'  placeholder='ej 114587427'
                                        defaultValue={dataUser.phone}
                                        onChange={inputHandler}
                                    />
                                </p>
                                <p className="error"></p>
                            </div>
                            <div class="field">
                                <p>Ciudad
                                    <input 
                                        className={styles.inputCiudad} name='city' type= 'text' placeholder='ej Maípu, Mendoza.'
                                        defaultValue={dataUser.city}
                                        onChange={inputHandler}
                                    />
                                </p>
                                <p className="error"></p>
                            </div>
                            <div class="field">
                                <p>Dirección
                                    <input 
                                        type= 'text' name='address'  placeholder='ej Salta 1234'
                                        defaultValue={dataUser.address}
                                        onChange={inputHandler}
                                    />
                                </p>
                                <p className="error"></p>
                            </div>
                            <div class="field">
                                <p>Opcional
                                    <input 
                                        type= 'text' name='optional' placeholder='ej casa o dpto / piso'
                                        defaultValue={dataUser.optional}
                                        onChange={inputHandler}
                                    />
                                </p>
                                <p className="error"></p>
                            </div>
                            <button className={styles.buttonEnviar} onClick={sendData}>
                                {!completeAccount && "Enviar!"}
                                {completeAccount && "Editar"}
                            </button>
                        </form>
                    </div>
                </div>
            <Footer/>
            <Toaster />
        </div>
    )
}

const mapDispatchToProps = {
    getAddressAndPhone: usersAction.getUserData,
}

const mapStateToProps = (state) => {
    return{
        id: state.users.id,
        token: state.users.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)