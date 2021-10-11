import styles from '../styles/sectionInfo.module.css'
import Information from './Information'
import productsActions from '../redux/actions/productsActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const SectionInfo = (props)=>{
    const {reference, products} = props
    const images =[
        {image: 'https://i.postimg.cc/jj5RTrz0/Nombre_(7).png', description: 'Notebook Lenovo I3 10ma Gen 15.6 Touch 8Gb 256Gb SSD Win 10'},
        {image: 'https://i.postimg.cc/sg5jwZQH/Nombre_(5).png', description: 'Joystick Inalámbrico Sony Dualsense Cosmic Red PS5'},
        {image: 'https://i.postimg.cc/jj5RTrz0/Nombre_(7).png', description: 'Notebook Lenovo I3 10ma Gen 15.6 Touch 8Gb 256Gb SSD Win 10'},
        {image: 'https://i.postimg.cc/sg5jwZQH/Nombre_(5).png', description: 'Joystick Inalámbrico Sony Dualsense Cosmic Red PS5'},
        {image: 'https://i.postimg.cc/jj5RTrz0/Nombre_(7).png', description: 'Notebook Lenovo I3 10ma Gen 15.6 Touch 8Gb 256Gb SSD Win 10'},
        {image: 'https://i.postimg.cc/sg5jwZQH/Nombre_(5).png', description: 'Joystick Inalámbrico Sony Dualsense Cosmic Red PS5'},
        {image: 'https://i.postimg.cc/jj5RTrz0/Nombre_(7).png', description: 'Notebook Lenovo I3 10ma Gen 15.6 Touch 8Gb 256Gb SSD Win 10'},
        {image: 'https://i.postimg.cc/sg5jwZQH/Nombre_(5).png', description: 'Joystick Inalámbrico Sony Dualsense Cosmic Red PS5'},
    ]

    useEffect(()=>{
        const getProducts = async () => {
            props.getProducts()
        }
        getProducts()
    }, [])

    return(
        <section id="novedades" className={styles.sectionContainer} ref={reference}> 
                <p>Novedades</p>
                <div className={styles.container}>
                    { products.reverse().map((product) =>
                        <div key={product._id} className={styles.galleryItem}>
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
                        </div>)}
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