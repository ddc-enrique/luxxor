import styles from '../styles/footer.module.css'
const Footer = ()=>{
    return(
    <footer className={styles.footerContainer}>
        <div className={styles.divContainer}>
            <div className={styles.navFooter}>
            <a href="#comoComprar">Novedades</a>
            <a>Productos</a>
            <a href="#contacto">Contacto</a>
            </div>
            <div className={styles.redes}>
                <img src= 'https://i.postimg.cc/RZr1wMdv/Dise-o-sin-t-tulo-50.png' alt='facebook'/>
                <img src= 'https://i.postimg.cc/prKsNpXX/Dise-o-sin-t-tulo-48.png' alt='facebook'/>
                <img src= 'https://i.postimg.cc/0jHys2tF/Dise-o-sin-t-tulo-49.png' alt='facebook'/>
            </div>
        </div>
        <p>Luxxor 2021 ©  - Todos los derechos reservados</p>
    </footer>
)
}
export default Footer