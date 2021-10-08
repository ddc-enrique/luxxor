import styles from '../styles/contact.module.css'
const Contact = ({ reference }) =>{
    return(
        <div className={styles.containerContact}>
            <form id="contacto" className={styles.formContact} ref={reference}>
                    <p>CONTÁCTANOS</p>
                    <input placeholder="Nombre"/>
                    <input type='mail' placeholder="Email"/>
                    <textarea type= 'text' placeholder="Mensaje"/>
                    <button>Enviar mensaje!</button>
            </form>
            <div className={styles.imageContact} style={{backgroundImage: 'url("https://i.postimg.cc/SKYqgXsy/8a9591545481ca29b3f44f9ed47b7d23-removebg-preview.png")'}}></div>
        </div>
    )
}

export default Contact


