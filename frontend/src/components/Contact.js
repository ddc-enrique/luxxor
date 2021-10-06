import styles from '../styles/contact.module.css'
var Carousel = require( '3d-react-carousal').Carousel;
const Contact = () =>{
    let slides = [
        <img  src="https://i.postimg.cc/MGRPjDfG/nh_1.jpg" alt="1" />,
        <img  src="https://i.postimg.cc/pTJssLZb/nh_2.jpg" alt="2" />  ,
        <img  src="https://i.postimg.cc/kMwj8DGW/nh_3.jpg" alt="3" />   
    ]
return(
    <> 
        <h2 className={styles.subtitleContact }>Contactanos</h2>
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
        <Carousel slides={slides} autoplay={false} interval={1500}/>
    </div>
    </>
)
}

export default Contact


