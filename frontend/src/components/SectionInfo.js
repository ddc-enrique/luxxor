import styles from '../styles/sectionInfo.module.css'
const SectionInfo = ()=>{
return(
    <section id="comoComprar" className={styles.sectionContainer}> 
        <h2>Como Comprar?</h2>
        <article className={styles.articleContainer}>
            <div className={styles.cardInfo} style={{backgroundImage: 'url("https://i.postimg.cc/ZqrngHc1/Dise-o-sin-t-tulo-51.png")'}}>
                <div className={styles.imgCard} style={{backgroundImage: 'url("https://i.postimg.cc/R0TDV3LN/registrarse.png")'}}></div>
                <p>
                Create una cuenta  y mira todos nuestras ofertas.
                </p>
            </div>
            <div className={styles.cardInfo} style={{backgroundImage: 'url("https://i.postimg.cc/ZqrngHc1/Dise-o-sin-t-tulo-51.png")'}}>
                <div className={styles.imgCard} style={{backgroundImage: 'url("https://i.postimg.cc/1zSdQ06k/producto2.png")'}}></div>
                <p>
                Elegí lo que te guste y agregalo al carrito.
                </p>
            </div>
            <div className={styles.cardInfo} style={{backgroundImage: 'url("https://i.postimg.cc/ZqrngHc1/Dise-o-sin-t-tulo-51.png")'}}>
                <div className={styles.imgCard} style={{backgroundImage: 'url("https://i.postimg.cc/Jn4dy1pK/tarjeta2.png")'}}></div>
                <p>
                Abona y recibilo en la comodidad de tu hogar.
                </p>
            </div>
        </article>
    </section>
)
}
export default SectionInfo