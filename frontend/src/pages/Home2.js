import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../styles/home2.module.css"
export const Home2 = () => {
    return (
        <div className={styles.containerHome} style={{backgroundImage: 'url("https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg")'}}>
           <nav>
            <Link to='/'>LUXXOR</Link>
           <div className={styles.navIntermedio}>
           <Link to='#'>¿CÓMO COMPRAR?</Link>
            <Link to='#'>PRODUCTOS</Link>
            <Link to='#'>CONTACTO</Link>
           </div>
            <Link to='#'>Usuario</Link>
            <Link to='#'>Carrito</Link>
           </nav> 
           <div className={styles.containerHero}>
           <div className={styles.details}>
           <h2>WH-XB910N</h2>
           <p>Auriculares externos inalámbricos con cancelación de ruido EXTRA BASS ™ con micrófono</p>
           </div>
           <div className={styles.photoPrincipal} style={{backgroundImage: 'url("https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png")'}}></div>
           {/* <div className={styles.photoPrincipal} style={{backgroundImage: 'url("https://i.postimg.cc/65YXwk14/01-WH-XB910-N-black-001-1-png-removebg-preview.png")'}}></div> */}
                <h1>Luxxor</h1>
           </div>
        </div>
         
    )
}
