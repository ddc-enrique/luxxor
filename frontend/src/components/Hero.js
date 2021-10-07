import CarouselHero from '../components/CarouselHero'
import styles from '../styles/hero.module.css'
import {Link} from 'react-router-dom'
const Hero=()=>{
    return(
        <div className={styles.heroContainer}>
            <div className={styles.containerProducts}  style={{backgroundImage: 'url("https://i.postimg.cc/FK1H0bkM/Nombre-4.png")'}}>
            <CarouselHero/> 
            </div>
            <div className={styles.subtitleHero}>
                <h2>
                Lo mejor en tecno en un solo lugar!
                </h2>
                <Link to= "/productos">
                    <button className={styles.buttonHero}>
                        Ver +
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Hero 