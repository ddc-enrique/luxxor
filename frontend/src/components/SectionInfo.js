import styles from '../styles/sectionInfo.module.css'
import Information from './Information'

const SectionInfo = ({ reference })=>{
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

    return(
        <section id="novedades" className={styles.sectionContainer} ref={reference}> 
                <p>Novedades</p>
                <div className={styles.container}>
                    { images.map((image,index) =>
                        <div key={index} className={styles.galleryItem}>
                            <div className={styles.image}>
                            <div className={styles.divImage} style={{backgroundImage: `url("${image.image}")`}} alt="nature">
                            </div>
                            <div className={styles.description}><p>{image.description}</p></div>
                            </div> 
                        </div>)}
                </div>
                <Information/>
        </section>
    )
}
export default SectionInfo