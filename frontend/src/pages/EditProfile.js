import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import usersAction from "../redux/actions/usersAction"
import styles from "../styles/editProfile.module.css"
import toast, { Toaster } from 'react-hot-toast';


const EditProfile = ({ completeAccount, id, getAddressAndPhone, token, firstName, lastName, editDataUser }) => {
    let initialDataUser = completeAccount ? { firstName: "", lastName: "", city: "", zipCode: "", address: "", optional: "", phone: "" }
        : { dni: null, city: "", zipCode: "", address: "", optional: "", phone: "" } 
    const [dataUser, setDataUser] = useState(initialDataUser)
    const [errorsValidation, setErrorsValidation] = useState({})

    useEffect( () => {
        const getDataUser = async () => {
            try{
                let extraData = await getAddressAndPhone(id, token)                
                setDataUser( {...extraData, firstName, lastName } )
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

    const keyPressHandler = e => {
        if(e.key === "Enter") updateDataUser()
    }

    const updateDataUser = async (e) => {
        e.preventDefault()
        try{
            let response = await editDataUser(id, completeAccount, token, dataUser)
            console.log(response)
            if(response.success){ 
                if(!completeAccount){
                    toast.success("Datos Actualizados con éxito ya puedes comprar")
                    completeAccount = true
                } else {
                    toast.success("Datos Actualizados con éxito")
                }
            }
        } catch(error) {
            if (typeof error === 'string' || error === "DNI en uso"){
                toast.error(error)
            } else if (Array.isArray(error)){
                let errors = {};
                error.forEach(err=> {
                    errors[err.path[0]] = err.message;
                })
                setErrorsValidation(errors);
            } else {
                toast.error("Error de Conexión")
            }
        }
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
                    </div>
                    <div className={styles.divContForm}>
                        <div className={styles.divExitoImg} style={{backgroundImage: 'url("https://i.postimg.cc/Kz4h0KXr/psvr-overview-hardware-column-image-01-ps4-en-06jan20-removebg-preview.png")'}}></div>
                        <form className={styles.formContainerExito}>
                            {/* <h3>
                                Actualiza tus datos para poder Comprar
                            </h3> */}
                            {!completeAccount  && 
                                <div className={styles.field}>
                                    <p>DNI
                                        <input 
                                            className={styles.inputDni} name='dni' type= 'number' placeholder='ej 44444444'
                                            defaultValue={dataUser.dni}
                                            onChange={inputHandler}
                                            onKeyPress={keyPressHandler}
                                        />
                                    </p>                                    
                                    {!errorsValidation["dni"] && <div className={styles.errorPlaceholder}></div>}
                                    {errorsValidation["dni"] && <p className={styles.error}>&nbsp;{errorsValidation["dni"]}</p>}
                                </div>
                            }
                            {completeAccount  && 
                                <div className={styles.field}>
                                    <p>Nombre
                                        <input 
                                            name='firstName' type= 'text' placeholder='ej Juan'
                                            defaultValue={dataUser.firstName}
                                            onChange={inputHandler}
                                            onKeyPress={keyPressHandler}
                                        />
                                    </p>
                                    {!errorsValidation["firstName"] && <div className={styles.errorPlaceholder}></div>}
                                    {errorsValidation["firstName"] && <p className={styles.error}>&nbsp;{errorsValidation["firstName"]}</p>}
                                </div>
                            }
                            {completeAccount  && 
                                <div className={styles.field}>
                                    <p>Apellido
                                        <input 
                                            name='lastName' type= 'text' placeholder='ej Garcia'
                                            defaultValue={dataUser.lastName}
                                            onChange={inputHandler}
                                            onKeyPress={keyPressHandler}
                                        />
                                    </p>
                                    {!errorsValidation["lastName"] && <div className={styles.errorPlaceholder}></div>}
                                    {errorsValidation["lastName"] && <p className={styles.error}>&nbsp;{errorsValidation["lastName"]}</p>}
                                </div>
                            }
                            <div className={styles.field}>
                                <p>Teléfono
                                    <input 
                                        type='text' name='phone'  placeholder='ej 114587427'
                                        defaultValue={dataUser.phone}
                                        onChange={inputHandler}
                                        onKeyPress={keyPressHandler}
                                    />
                                </p>
                                {!errorsValidation["phone"] && <div className={styles.errorPlaceholder}></div>}
                                {errorsValidation["phone"] && <p className={styles.error}>&nbsp;{errorsValidation["phone"]}</p>}
                            </div>
                            <div className={styles.field}>
                                <p>Ciudad
                                    <input 
                                        className={styles.inputCiudad} name='city' type= 'text' placeholder='ej Maípu, Mendoza.'
                                        defaultValue={dataUser.city}
                                        onChange={inputHandler}
                                        onKeyPress={keyPressHandler}
                                    />
                                </p>
                                {!errorsValidation["city"] && <div className={styles.errorPlaceholder}></div>}
                                {errorsValidation["city"] && <p className={styles.error}>&nbsp;{errorsValidation["city"]}</p>}
                            </div>
                            <div className={styles.field}>
                                    <p>Cod Postal
                                        <input 
                                            name='zipCode' type= 'number' placeholder='ej 5501'
                                            defaultValue={dataUser.zipCode}
                                            onChange={inputHandler}
                                            onKeyPress={keyPressHandler}
                                        />
                                    </p>
                                    {!errorsValidation["zipCode"] && <div className={styles.errorPlaceholder}></div>}
                                    {errorsValidation["zipCode"] && <p className={styles.error}>&nbsp;{errorsValidation["zipCode"]}</p>}
                                </div>
                            <div className={styles.field}>
                                <p>Dirección
                                    <input 
                                        type= 'text' name='address'  placeholder='ej Salta 1234'
                                        defaultValue={dataUser.address}
                                        onChange={inputHandler}
                                        onKeyPress={keyPressHandler}
                                    />
                                </p>
                                {!errorsValidation["address"] && <div className={styles.errorPlaceholder}></div>}
                                {errorsValidation["address"] && <p className={styles.error}>&nbsp;{errorsValidation["address"]}</p>}
                            </div>
                            <div className={styles.field}>
                                <p>Opcional
                                    <input 
                                        type= 'text' name='optional' placeholder='ej casa o dpto / piso'
                                        defaultValue={dataUser.optional}
                                        onChange={inputHandler}
                                        onKeyPress={keyPressHandler}
                                    />
                                </p>
                                {!errorsValidation["optional"] && <div className={styles.errorPlaceholder}></div>}
                                {errorsValidation["optional"] && <p className={styles.error}>&nbsp;{errorsValidation["optional"]}</p>}
                            </div>
                            <button className={styles.buttonEnviar} onClick={updateDataUser}>
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
    editDataUser: usersAction.editDataUser,
}

const mapStateToProps = (state) => {
    return{
        id: state.users.id,
        token: state.users.token,
        firstName: state.users.firstName,
        lastName: state.users.lastName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)