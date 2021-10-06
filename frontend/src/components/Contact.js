import styles from '../styles/contact.module.css'
const Contact = () =>{
return(
    <> 
        <div className={styles.containerContact}>
        <form id="contacto" class={styles.formContact}>
            <h2 data-anijs="if: click, do: rubberBand animated, to: .container-box className={styles.cardInfo}" >CONTACTO</h2>
            <p type="Nombre:"><input placeholder="Escribe tu nombre"/></p>
            <p type="Email:"><input type='mail' placeholder="Escribe tu email"/></p>
            <p type="Mensaje:"><input type= 'text' placeholder="Me contacto con ustedes... "/></p>
            <button>Enviar mensaje!</button>
            <div>
                <span><img src='https://i.postimg.cc/66j38JsY/contacto.png' alt='icon' width='28'/>  0800-555-2147</span>
                <span><img src='https://i.postimg.cc/vTNHk97p/mail.png' alt='icon' width='25'/> luxxor.tech@gmail.com</span> 
            </div>
        </form>
        <div className={styles.imagen} style={{backgroundImage: 'url("./assets/app.gif")'}}>
        </div>
    </div>
    </>
)
}

export default Contact


