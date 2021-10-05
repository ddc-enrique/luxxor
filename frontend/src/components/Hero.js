import Carousel from '../components/Carousel'
import styles from '../styles/hero.module.css'

const Hero=()=>{
    return(
        <div className={styles.heroContainer}>
            <div className={styles.containerProducts}  style={{backgroundImage: 'url("https://i.postimg.cc/FK1H0bkM/Nombre-4.png")'}}>
            <Carousel/> 
            </div>
            <div className={styles.subtitleHero}>
                <h2>
                Lo mejor en tecno en un solo lugar!
                </h2>
                <button className={styles.buttonHero}>
                    Ver +
                </button>
            </div>
        </div>
    )
}
export default Hero 