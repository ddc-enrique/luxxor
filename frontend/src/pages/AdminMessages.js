import styles from "../styles/adminMessages.module.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NavAdmin } from "../components/NavAdmin";


const AdminMessages = () => {
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        
    }, [])

    return (
        <div className={styles.divContainer}>
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
                    <h2 className={styles.headerMessages}>Mensajes de sección Contacto</h2>
                    <div className={styles.containerNewMessages}>

                    </div>
                </div>
            </div>
        </div>

    )
}

const mapDispatchToProps = {

}

export default connect (null, mapDispatchToProps)(AdminMessages)
