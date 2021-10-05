import { useState } from 'react'
import styles from '../styles/navBar.module.css'
import { Link } from "react-router-dom"

const NavBar = () => {
    const [visible, setVisible] =useState(false)
    const [visibleMenu, setVisibleMenu] =useState(false)
    const clickHandler= ()=>{
        setVisible(!visible)
    }
    const clickHandlerMenu= ()=>{
        setVisibleMenu(!visibleMenu)
    }

return(
    <header className={styles.headerContainer}>
        <Link to='/'>
            <h1>Lu<span className={styles.orange}>x</span><span className={styles.violet}>x</span>or</h1>
        </Link>
        <nav className={styles.navContainer}>
            <a href="#comoComprar">Como Comprar?</a>
            <p>Productos</p>
            <a href="#contacto">Contacto</a>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/jjnwNZtm/Dise-o-sin-t-tulo-44.png")'}} onClick={clickHandler}>
            </div>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/1z2c686R/Dise-o-sin-t-tulo-46.png")'}}>
            </div>
        </nav>
            {visibleMenu && 
            <nav className={styles.navContainerMobile}>
                <a href="#comoComprar">Como Comprar?</a>
                <p>Productos</p>
                <a href="#contacto">Contacto</a>
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/jjnwNZtm/Dise-o-sin-t-tulo-44.png")'}} onClick={clickHandler}>
                </div>
                <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/1z2c686R/Dise-o-sin-t-tulo-46.png")'}}>
                </div>
            </nav>}
        <div className={styles.menu} style={{backgroundImage: 'url("https://i.postimg.cc/R0X4cphc/menu-1.png")'}}  onClick={clickHandlerMenu}></div>
            { visible &&  <div className={styles.dropDown}>
                <Link to="/ingreso"><p>Ingresar</p></Link>
                <Link to="/registro"><p>Registrarme</p></Link>
            </div>}
    </header>
)
}
export default NavBar