import React from 'react'
import NavBar from '../components/NavBar';
import styles from "../styles/product.module.css";
export const Product2 = () => {
    return (
        <>
        <NavBar/>
        <div className={styles.productsContainer}>
           <div className={styles.containerProduct}>
           <div className={styles.title}>
           <p>Informática</p>
           <h2>Audífonos inalámbricos WF-XB700 con EXTRA BASS™</h2>
           <p>$12.000</p>
           <p className={styles.cart}>SONY</p>
           </div>
           <div className={styles.photo} style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/65YXwk14/01-WH-XB910-N-black-001-1-png-removebg-preview.png')"
                    }}>
           </div>
           <div className={styles.description}>
           <p>ESPECIFÍCACIONES</p>
           <h2>Audífonos inalámbricos WF-XB700 con EXTRA BASS™</h2>
           <p>$12.000</p>
           <span>Ver todas las promociones</span>
           <p>Te llega a partir de <span className={styles.orange}>Mañana 6 de Octubre</span>
                  </p>
                  <p>
                    1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                  <button className={styles.cart}>AGREGAR AL CARRITO</button>
           </div>
           </div>
        </div>
        </>
    )
}
