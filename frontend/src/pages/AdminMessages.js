import styles from "../styles/admin.module.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavAdmin } from "../components/NavAdmin";
import messagesActions from "../redux/actions/messagesActions";
import toast, { Toaster } from "react-hot-toast";
import MessageRow from "../components/MessageRow";


const AdminMessages = (props) => {
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        const getAllMessages = async() => {
            try {
                let response = await props.getMessages()
                setMessages(response)
            } catch (error) {
                if(typeof error === "string"){
                    toast.error(error)
                } else {
                    toast.error("Error de Conexión, intente más tarde")
                }                
            }
        }        
        if(!messages.length) getAllMessages()
    }, [])
    
    const deleteMessage = async(id) =>{
        try {
            let response = await props.removeMessage(id, props.token)
            if(response.success) {
                toast('Mensaje Eliminado', { icon: '🗑️',})
                setMessages(messages.filter(message => message._id !== id))
            }else{
                throw response.response
            }
        } catch (error) {
            toast.error("No se pudo eliminar el mensaje, intentelo más tarde")
        }
    }

    return (
        <div className={styles.divContainer}>
            <Toaster />
            <header className={styles.headerAdmin}>
                <Link to="/">
                    <h1>
                    Lu<span className={styles.orange}>x</span>
                    <span className={styles.violet}>x</span>or
                    </h1>
                </Link>
            </header>
            <div className={styles.containerAdmin}>
                <NavAdmin/>
                <div className={styles.containerMessages}>
                    <h2 className={styles.headerMessages}>Mensajes desde la sección Contacto</h2>
                    <table
                        className={styles.tableMessages}
                    >
                        <thead
                            className={styles.headerTableMessages}
                        >
                            <tr>
                                <th>
                                    Dia
                                </th>
                                <th
                                >
                                    Nombre
                                </th>
                                <th
                                >
                                    Email
                                </th>
                                <th>
                                    Ver Más
                                </th>
                                <th>
                                    Eliminar
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className={styles.tableBodyMessages}
                        >
                        {messages.map(message => (
                            <MessageRow
                                key={message._id}
                                message={message}
                                deleteMessage={deleteMessage}
                                styles={styles}
                            />                            
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

const mapDispatchToProps = {
    getMessages: messagesActions.getAllMessages,
    removeMessage: messagesActions.deleteMessage
}

const mapStateToProps = (state) => {
    return{
        token: state.users.token
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(AdminMessages)
