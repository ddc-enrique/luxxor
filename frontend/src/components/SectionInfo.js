import styles from '../styles/sectionInfo.module.css'
import Information from './Information'
import productsActions from '../redux/actions/productsActions'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SectionInfo = (props)=>{
    const [products, setProducts] = useState([...props.products])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getProducts = async () => {
            let res = await props.getProducts()
            setProducts(res)
            setLoading(!loading);
        }
        getProducts()
    }, [])
    console.log(products)
    return(
        <section id="novedades" className={styles.sectionContainer} ref={props.reference}> 
                <p>Novedades</p>
                <div className={styles.container}>
                {loading ? <div className={styles.loading}>{loading}</div> : products.reverse().slice(0 , 6).map((product) =>
                    <Link key={product._id} to={`/producto/${product._id}`}>
                        <div  className={styles.galleryItem}>
                            <div className={styles.image}>
                                <div className={styles.divImage} style={{backgroundImage: `url("http://localhost:4000/productsPhoto/${product.photos[0]}")`}} alt="nature">
                            </div>
                            <div className={styles.descriptionContainer}>
                                    <div className={styles.descriptionFirst}><p>{product.name}</p></div>
                                <div className={styles.descriptionRowOne}>    
                                    <div className={styles.description}><p>{product.brand.name}</p></div>
                                    <div className={styles.description}><p>{product.category.name}</p></div>
                                    <div className={styles.description}><p>{product.price}</p></div>
                                </div>
                            </div>
                        </div> 
                        </div> 
                        </Link> )}
                </div>
                <Information/>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.products
}


export default connect(mapStateToProps, mapDispatchToProps) (SectionInfo)