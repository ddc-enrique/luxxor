import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { connect } from 'react-redux'
import usersAction from '../redux/actions/usersAction'
import styles from '../styles/contact.module.css'
const Contact = ({ reference, sendNewMessage }) =>{
    const [newMessage, setNewMessage] = useState({
        authorName: "",
        email: "",
        textMessage: ""
    })
    const [errorsValidation, setErrorsValidation] = useState({})

    const handleInputText = (e) => {
        setNewMessage({
            ...newMessage,
            [e.target.name]: e.target.value
        })
    }

    const sendMessage = async(e) => {
        e.preventDefault()
        console.log("enviar mensaje")
        console.log(newMessage)
        try {
            let response = await sendNewMessage(newMessage)
            if(response.success) toast.success("Gracias por su mensaje, estaremos en contacto")
            setNewMessage({
                authorName: "",
                email: "",
                textMessage: ""
            })
        } catch (error) {
            console.log(error)
            if (typeof error === 'string'){
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
        <div className={styles.containerContact}>
            <Toaster 
                position="bottom-center"
            />
            <form id="contacto" className={styles.formContact} ref={reference}>
                    <p className={styles.headerContact}>CONTÁCTANOS</p>
                    <div className={styles.eachInput}>
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            name="authorName" 
                            value={newMessage.authorName} 
                            onChange={handleInputText}
                        />
                        {!errorsValidation["authorName"] && <p className={styles.errorPlaceholder}>&nbsp;</p>}
                        {errorsValidation["authorName"] && <p className={styles.error}>&nbsp;{errorsValidation["authorName"]}</p>}
                    </div>
                    <div className={styles.eachInput}>
                        <input 
                            type='mail' 
                            placeholder="Email" 
                            name="email" 
                            value={newMessage.email} 
                            onChange={handleInputText}
                        />
                        {!errorsValidation["email"] && <p className={styles.errorPlaceholder}>&nbsp;</p>}
                        {errorsValidation["email"] && <p className={styles.error}>&nbsp;{errorsValidation["email"]}</p>}
                    </div>
                    <div className={styles.eachInput}>
                        <textarea 
                            type= 'text' 
                            placeholder="Mensaje" 
                            name="textMessage" 
                            value={newMessage.textMessage} 
                            onChange={handleInputText}
                        />
                        {!errorsValidation["textMessage"] && <p className={styles.errorPlaceholder}>&nbsp;</p>}
                        {errorsValidation["textMessage"] && <p className={styles.error}>&nbsp;{errorsValidation["textMessage"]}</p>}
                    </div>
                    <button
                        onClick={sendMessage}
                    >
                        Enviar mensaje!
                    </button>
            </form>
            <div className={styles.imageContact} style={{backgroundImage: 'url("https://i.postimg.cc/SKYqgXsy/8a9591545481ca29b3f44f9ed47b7d23-removebg-preview.png")'}}></div>
        </div>
    )
}

const mapDispatchToProps = {
    sendNewMessage: usersAction.sendNewMessage,
}

export default connect(null, mapDispatchToProps)(Contact)


