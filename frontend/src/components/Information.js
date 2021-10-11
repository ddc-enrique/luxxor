import styles from '../styles/information.module.css'
const Information = () => {
    return(
        <div className={styles.divContainerInfo}>
            <div className={styles.cardInfo}>
                <p className={styles.titleCard}>¡VARIOS MEDIOS DE PAGO!</p>
                <div className={styles.divImageInfo} style={{backgroundImage: 'url("https://i.postimg.cc/YSDGN5j5/Diseño_sin_título_(64).png")'}}></div>
                <p className={styles.cardText}>Elegí el que más te guste</p>
            </div>
            <div className={styles.cardInfo}>
                <p className={styles.titleCard}>ENVÍOS A TODO EL PAÍS</p>
                <div className={styles.divImageInfo} style={{backgroundImage: 'url("https://i.postimg.cc/RZD4g4QL/camion.png")'}}></div>
                <p className={styles.cardText}>¡Rápido, sin vueltas!</p>
            </div>
            <div className={styles.cardInfo}>
                <p className={styles.titleCard}>COMPRA 100% SEGURA</p>
                <div className={styles.divImageInfo} style={{backgroundImage: 'url("https://i.postimg.cc/V6srXYYB/seguridad.png")'}}></div>
                <p className={styles.cardText}>Garantías Oficiales</p>
            </div>
        </div>
    )

}
export default Information