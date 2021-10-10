import styles from "../styles/adminMessages.module.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavAdmin } from "../components/NavAdmin";
import messagesActions from "../redux/actions/messagesActions";
import toast, { Toaster } from "react-hot-toast";


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
                    <div className={styles.containerNewMessages}>
                    {messages.map(message => (
                        <div 
                            className={styles.eachMessage}
                            key={message._id}
                        >
                            {message.textMessage}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapDispatchToProps = {
    getMessages: messagesActions.getAllMessages
}

export default connect (null, mapDispatchToProps)(AdminMessages)
