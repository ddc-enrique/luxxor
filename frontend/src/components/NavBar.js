import styles from '../styles/navBar.module.css'
import { Link } from "react-router-dom"

const NavBar = () => {
return(
    <header className={styles.headerContainer}>
        <h1>Lu<span className={styles.orange}>x</span><span className={styles.violet}>x</span>or</h1>
        <nav className={styles.navContainer}>
            <p>Como Comprar?</p>
            <p>Productos</p>
            <p>Contacto</p>
            <Link to="/signup">Sign up</Link>
        </nav>
        <div className={styles.navIcons}>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/jjnwNZtm/Dise-o-sin-t-tulo-44.png")'}}>
            </div>
            <div className={styles.icon} style={{backgroundImage: 'url("https://i.postimg.cc/1z2c686R/Dise-o-sin-t-tulo-46.png")'}}>
            </div>
            </div>
    </header>
)
}
export default NavBar