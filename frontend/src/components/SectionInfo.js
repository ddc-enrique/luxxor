import styles from '../styles/sectionInfo.module.css'

const SectionInfo = ({ reference })=>{
    const images =[
        "https://i.postimg.cc/m2DJ26Nr/OFERTA.png"
    ]
    return(
        <section id="novedades" className={styles.sectionContainer} ref={reference}> 
            <p>Novedades</p>
            <div className={styles.container}>
        <div className={styles.w3} className={styles.h2}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="nature"/>
            </div>
        
        </div>
        </div>
    
        <div className={styles.w3} className={styles.h3}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="people"/>
            </div>
        
        </div>
        </div>
    
        <div className={styles.h2}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="sport"/>
            </div>
        </div>
        </div>
        <div className={styles.w4} className={styles.h1}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="food"/>
            </div>
        </div>
        </div>
        <div className={styles.galleryContainer}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="travel"/>
            </div>
        </div>
        </div>
        <div className={styles.h2}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="art"/>
            </div>
        </div>
        </div>
        <div className={styles.w3}  className={styles.h2}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="cars"/>
            </div>
        </div>
        </div>
        <div className={styles.w2} className={styles.h2}>
        <div className={styles.galleryItem}>
            <div className={styles.image}>
            <img src={images} alt="fitness"/>
            </div>
        </div>
        </div>
    </div>
</section>
    )
}
export default SectionInfo