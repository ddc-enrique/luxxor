import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";
import { ChevronUp, Whatsapp } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.divContainer}>
        <div className={styles.navFooter}>
          <a href="#comoComprar">Novedades</a>
          <Link to="/productos">Productos</Link>
          <a href="#contacto">Contacto</a>
        </div>
        <Link to="#" className={styles.up} onClick={window.scrollTo(0, 0)}>
          <ChevronUp className={styles.icon} /> Subir
        </Link>
        <a
          href="https://api.whatsapp.com/send?phone=543516225661"
          target="_blank"
          className={styles.whatsapp}
        >
          <Whatsapp className={styles.icon} />{" "}
        </a>
        {/* <span>Contactanos</span> */}
        <div className={styles.redes}>
          <img
            src="https://i.postimg.cc/RZr1wMdv/Dise-o-sin-t-tulo-50.png"
            alt="facebook"
          />
          <img
            src="https://i.postimg.cc/prKsNpXX/Dise-o-sin-t-tulo-48.png"
            alt="facebook"
          />
          <img
            src="https://i.postimg.cc/0jHys2tF/Dise-o-sin-t-tulo-49.png"
            alt="facebook"
          />
        </div>
      </div>
      <p>Luxxor 2021 © - Todos los derechos reservados</p>
    </footer>
  );
};
export default Footer;
