
import styles from '../styles/hero.module.css'
const Hero=()=>{
    return(
        <div className={styles.divContainer}>
            <div className={styles.containerHero}>
                <div className={styles.details}>
                    <h2>WH-XB910N</h2>
                    <p>Auriculares externos inalámbricos con cancelación de ruido EXTRA BASS ™ con micrófono</p>
                </div>
                <div className={styles.photoPrincipal} style={{backgroundImage: 'url("https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png")'}}></div>
                <h1>Luxxor</h1>
            </div>
        </div>
    )
}
export default Hero 