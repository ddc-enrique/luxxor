import React, { useEffect } from 'react'
import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from "../styles/product.module.css";
import { connect } from "react-redux";
import shopCartActions from "../redux/actions/shopCartActions"
import toast, { Toaster } from "react-hot-toast"
import productsActions from "../redux/actions/productsActions"
import Moment from 'react-moment'
import { Carousel } from 'react-carousel-minimal'
// import 'moment-timezone'

const Product2 = (props) => {
  const [detailsOn, setDetailsOn] = useState(false);
  const [product,setProduct]=useState({})
  const [modal, setModal] = useState(false);
  const [loading,setLoading]=useState(true)
  const date = new Date()
  const data = [
    {
        image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png", name: 'nombre del producto'
    },
    {
      image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png", name: 'nombre del producto'
  },
  {
    image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png", name: 'nombre del producto'
},


]
  useEffect(()=>{
    window.scrollTo(0,0)
    if(props.products.length){
      props.product(props.match.params.id)
      .then((res)=>{
        if(!res.data.success){
          toast("Disculpe,tenemos problemas tecnicos,vuelva en unos minutos.", {
            icon: "🚫",
            style: {
              borderRadius: "1rem",
              background: "#fff",
              color: "#545454",
            }
          })
        }else{
          setProduct(res.data.response)
          setLoading(!loading)
        }
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
    }
  },[])

  const addProductHandler=()=>{
    props.addProduct(props.match.params.id,product.price,product.discount,product.name)
  }

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
           <p>{product.category}</p>
           <h2>{product.name}</h2>
           <p className={styles.detailDescription}>Diseño elegante y plegable</p>
           <p className={styles.cart}>SONY</p> {/* POPULAR BRAND */}
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
           <p>${" "+product.price}</p>
           <span>Ver todas las promociones</span>
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
                  <div
                    className={styles.icon}
                    onClick={() => setModal(!modal)}
                    
                  >X</div>
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
            <div className={styles.divContainerPics}>
              {data.map((product)=><div className={styles.picRecomendados} style={{backgroundImage:`url('${product.image}')`}}> <p>{product.name}</p></div>)}
            </div>
          </div>
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

}

export default connect(mapStateToProps,mapDispatchToProps)(Product2)