import { useState } from 'react'
import styles from '../styles/navBar.module.css'
import { Link } from "react-router-dom"

const NavBar = () => {
    const [visible, setVisible] =useState(false)
    const clickHandler= ()=>{
        setVisible(!visible)
    }

return(
    <header className={styles.headerContainer}>
        <h1>Lu<span className={styles.orange}>x</span><span className={styles.violet}>x</span>or</h1>
        <nav className={styles.navContainer}>
            <p>Como Comprar?</p>
            <p>Productos</p>
            <p>Contacto</p>
            
        </nav>
        <div className={styles.navIcons}>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/jjnwNZtm/Dise-o-sin-t-tulo-44.png")'}} onClick={clickHandler}>
            </div>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/1z2c686R/Dise-o-sin-t-tulo-46.png")'}}>
            </div>
            </div>
            { visible &&  <div className={styles.dropDown}>
                <p>Ingresar</p>
                <Link to="/signup"><p>Registrarme</p></Link>
                </div>}
    </header>
)
}
export default NavBar