import React from 'react'
import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from "../styles/product.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"

const Product2 = (props) => {
  const [detailsOn, setDetailsOn] = useState(false);
  const [modal, setModal] = useState(false);
  
  console.log(props.cartProduct)

  const details = detailsOn &&(
   
    <>
     <p>CARACTERÍSTICAS</p>
           <h2>Audífonos inalámbricos WF-XB700 con EXTRA BASS™</h2>
           <p>$12.000</p>
           <span>Ver todas las promociones</span>
           <p>Te llega a partir de <span className={styles.orange}>Mañana 6 de Octubre</span>
                  </p>
                  <p>
                    1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                  <button onClick={()=>{
                    
                    props.addProduct(props.match.params.id)
                  }}
                  className={styles.cart}>AGREGAR AL CARRITO</button>
                 
    </>
  )
    return (
        <>
           <button onClick={()=>{
              props.deleteProduct(props.match.params.id,false)
            }} className={styles.cart}> ELIMINAR </button>

             <button onClick={()=>{
              props.deleteProduct(props.match.params.id,true)
            }}className={styles.cart}> ELIMINAR TODO </button>

            <button onClick={()=>{
              props.resetCart()
            }}className={styles.cart}> ELIMINAR CARRITO </button>

           <NavBar/>
        <div className={styles.productsContainer}>
           <div className={styles.containerProduct}>
           <div className={styles.title}>
           <p>Informática</p>
           <h2>Audífonos inalámbricos WF-XB700 con EXTRA BASS™</h2>
           <p className={styles.detailDescription}>Diseño elegante y plegable</p>
           <p className={styles.cart}>SONY</p>
           </div>
           <div className={styles.photo} style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/65YXwk14/01-WH-XB910-N-black-001-1-png-removebg-preview.png')"
                    }}>
           </div>
           <div className={styles.description}>
           <button onClick={() => setDetailsOn(!detailsOn)}>{!details ? 'VER +' : 'VER -'}</button>
           {details}
		   <button onClick={() => setModal(!modal)} className={styles.modalButton}>ESPECIFICACIONES</button>
		   </div>
           <div className={styles.descriptionWeb}>
           <h2>Audífonos inalámbricos WF-XB700 con EXTRA BASS™</h2>
           <p>$12.000</p>
           <span>Ver todas las promociones</span>
           <p>Te llega a partir de <span className={styles.orange}>Mañana 6 de Octubre</span>
                  </p>
                  <p>1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                  <button  onClick={()=>{props.addProduct(props.match.params.id)}}className={styles.cart}>AGREGAR AL CARRITO</button>
				  <button onClick={() => setModal(!modal)} className={styles.modalButton}>ESPECIFICACIONES</button>
           </div>
         
           </div>
        </div> 
		{modal && (
                <div className={styles.modal}>
                  <div
                    className={styles.icon}
                    onClick={() => setModal(!modal)}
                    
                  >X</div>
				  <div>
					 <h3>FICHA TÉCNICA</h3>
					  <ul>
						  <li>Duración de la Batería: 8hs</li>
						  <li>Memoría RAM: 4GB</li>
					  </ul>
						 <h3>DESCRIPCIÓN</h3>
						 <p>Disfruta de tu fiesta personal con un sonido EXTRA BASS™. Con batería todo el día, tecnología inalámbrica Bluetooth®, comodidad para largas escuchas y funcionalidad.</p>
					 </div>
                </div>
              )}

        </>
    )
}

const mapStateToProps = (state) => {
  return {
    cartProduct:state.shopCart
  }
}
const mapDispatchToProps ={
  addProduct:shopCartActions.addToCart,
  deleteProduct:shopCartActions.deleteToCart,
  resetCart:shopCartActions.resetCart
}

export default connect(mapStateToProps,mapDispatchToProps)(Product2)