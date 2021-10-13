import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from "../styles/product.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"
import toast, { Toaster } from "react-hot-toast"
import productsActions from "../redux/actions/productsActions"
import Moment from 'react-moment'
import { XCircle } from 'react-bootstrap-icons';
import Footer from '../components/Footer';


const Product2 = (props) => {
  const [detailsOn, setDetailsOn] = useState(false);
  const [product,setProduct]=useState({category:{_id : 1}})
  const [prodRecomen, setProdRecomen] = useState(false)
  const [products,setProducts]=useState([])
  const [modal, setModal] = useState(false);
  const [loading,setLoading]=useState(true)
  const date = new Date()
// console.log(product)
  useEffect(()=>{
    window.scrollTo(0,0)
    if(!props.products.length){
      props.products()
      .then((res)=>{
          let productAux = res.find(product=> product._id===props.match.params.id)
          setProduct(productAux)
          setProducts(res)
          setLoading(!loading)
        
      })
      .catch(error=>{
        setLoading(!loading)
        console.log(error)
        toast("Problemas tecnicos", {
          icon: "🚫",
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          }
        })
      })
    }else{
      setProduct(props.products.find(product=> product._id===props.match.params.id))
      setProducts(props.products)
      setLoading(false)
    }
    // eslint-disable-next-line
  },[])
  useEffect(()=>{
      setProduct(products.find(product=> product._id===props.match.params.id))
  }, [prodRecomen])

  const addProductHandler=()=>{
    props.addProduct(props.match.params.id,product.price,product.discount,product.name)
  }
  const arrayRecom =products.filter(item => item.category._id === product.category._id && item._id !== product._id)
  const details = detailsOn &&(
   
    <>
     <p>CARACTERÍSTICAS</p>
           <h2>{product.name}</h2>
           <p>$ {" "+product.price}</p>
           <span>Ver todas las promociones</span>
           <p>Te llega a partir de <span className={styles.orange}><Moment add={{ days: 5, hours: 1 }} format="D MMM YYYY" withTitle>{date}</Moment> </span>
                  </p>
                  <p>
                    1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                  <button onClick={addProductHandler}
                  className={styles.cart}>AGREGAR AL CARRITO</button>
    </>
  )

  if(loading){
    return(
        <>
          <h1>LOADING...</h1>
        </>
    )
  }
    return (
        <>

           <NavBar/>
        <div className={styles.productsContainer}>
           <div className={styles.containerProduct}>
           <div className={styles.title}>
           <p>{product.category.name}</p>
           <h2>{product.name}</h2>
           <p className={styles.detailDescription}>{product.dataSheet[0].optionValue}</p>
           <p className={styles.cart}>{product.brand.name}</p>
           </div>
           <div className={styles.photo} style={{
                      backgroundImage:
                        `url(http://localhost:4000/productsPhoto/${product.photos[0]})`
                    }}>
           </div>
           <div className={styles.description}>
           <button onClick={() => setDetailsOn(!detailsOn)}>{!details ? 'VER +' : 'VER -'}</button>
           {details}
		   <button onClick={() => setModal(!modal)} className={styles.modalButton}>ESPECIFICACIONES</button>
		   </div>
           <div className={styles.descriptionWeb}>
           <h2>{product.name}</h2>
           <p className={styles.price}>${" "+product.price}</p>
           <p className={styles.copy}>Precio con descuento: ${(product.price * (1-(product.discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
           {/* <Moment add={{ days: 5, hours: 1 }} format="D MMM YYYY" withTitle>{date}</Moment> */}
           <p>Te llega a partir de <span className={styles.orange}><Moment add={{ days: 5, hours: 1 }} format="D MMM YYYY" withTitle>{date}</Moment> </span>
                  </p>
                  <p>1 Año de garantia oficial. 10 días para cambios y
                    devoluciones
                  </p>
                  <button  onClick={addProductHandler} className={styles.cart}>AGREGAR AL CARRITO</button>
				  <button onClick={() => setModal(!modal)} className={styles.modalButton}>ESPECIFICACIONES</button>
           </div>
         
           </div>
        </div> 
		{modal && (
                <div className={styles.modal}>
                  {/* <div
                    className={styles.icon}
                    onClick={() => setModal(!modal)}
                    
                  >X</div> */}
                  <XCircle className={styles.icon} onClick={() => setModal(!modal)}/>
				  <div>
					 <h3>FICHA TÉCNICA</h3>
					  <ul>
              {
                product.dataSheet.map(item=>{
                  return(
                    <>
                      <li>{item.optionName}: {item.optionValue}</li>
                    </>
                  )
                })
              }
					</ul>
              <h3>DESCRIPCIÓN</h3>
              <p>{product.description}</p>
					</div>
                </div>
              )}
          <Toaster position="top-center" reverseOrder={false} />
          <div className={styles.divRecomendados}>
            <h3>También te puede interesar..</h3>
            <div className={styles.containerPicItems}>
              {arrayRecom.map((item, index) =>
                <Link key={index}  to={`/producto/${item._id}`} onClick={() =>{ setProdRecomen(!prodRecomen); console.log('onClick')}}>
                    <div className={styles.galleryItem}>
                    <div className={styles.imageItem}>
                    <div className={styles.divImage}  style={{backgroundImage: `url(http://localhost:4000/productsPhoto/${item.photos[0]})`}} alt="pic">
                    </div>
                    <div className={styles.descriptionItem}><p>{item.name}</p><p> ${(item.price * (1-(product.discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p></div>
                    </div> 
                    </div>
                </Link>
                )}

            </div>
          </div>
           <Footer/> 
        </>
    )
}


const mapStateToProps = (state) => {
  return {
    cartProduct: state.shopCart,
    products: state.products.products,
    brands: state.products.brands
  }
}
const mapDispatchToProps ={
  addProduct:shopCartActions.addToCart,
  product:productsActions.product,
  products: productsActions.products

}

export default connect(mapStateToProps,mapDispatchToProps)(Product2)