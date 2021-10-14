import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
// import styles from "../styles/modal2.module.css";
import { connect } from "react-redux";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"
import shopCartActions from "../redux/actions/shopCartActions"
import {  XCircleFill } from 'react-bootstrap-icons'
import productsActions from "../redux/actions/productsActions";
import toast, { Toaster } from "react-hot-toast"
import { useHistory } from "react-router"
 
const ModalCart = (props) =>{
    const [products,setProducts]=useState([])
    const[products2,setProducts2]=useState([])
    const[loading,setLoading]=useState(true)
    const[total,setTotal]=useState(0)
    let aux
    const history = useHistory()

    useEffect(()=>{
        
        props.cartProduct.forEach(item=>{
            props.product(item.productId)
            .then((res)=>{
                aux= {...res.data.response,quantity:item.quantity}
                 setProducts2(products2.push(aux))
                 setProducts(products2)               
            })
            .catch(e=>console.log(e))
        }) 
        setLoading(false)  

    },[])

     const DeleteProductModalCart=(id,deleteAll,price,quantity,discount)=>{
        props.deleteProduct(id,deleteAll,price,quantity,discount)
        setProducts(products.filter(product=>product._id!==id))
    } 
    const endShop=()=>{
        if((props.cartProduct).length===0){
            toast("Al menos debes tener una unidad en el carrito.", {
                icon: "🚫",
                style: {
                  borderRadius: "1rem",
                  background: "#fff",
                  color: "#545454",
                },
            })
        }else{
           history.push("/checkout") 
        }
      }
   if(loading){
        return(
            <div className={styles.containerGeneral}>
            <div className={styles.loading}></div>
            </div>
        )
    } 
    return(
        <div className={styles.containerGeneral}>
            <div className={styles.containerCart}>
                {/* <img onClick={()=>props.setModalCart(false)} className={styles.iconClose} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/> */}
                <XCircleFill onClick={()=>props.setModalCart(false)} className={styles.iconClose}/>
                <h2>Carrito de Compras</h2>
               { !props.cartProduct.length ?
               (<>
                    <p>Tu carrito está vacío</p>
                    <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
                    <Link to="/productos">
                        <div className={styles.price}> <p>Ver productos</p></div>
                    </Link>
               </>
                ) : (
                        <>
                <div className={styles.containerSubTitle}>
                    <h3>PRODUCTO</h3>
                    <h3>SUBTOTAL</h3>
                </div>
                
                    {
                        products.map(product=>{                          
                            return(
                                <CardProductCart 
                                sale={false} 
                                product={product} 
                                deleteProduct={props.deleteProduct} 
                                setTotal={setTotal} total={total}
                                key={product._id} 
                                DeleteProductModalCart={DeleteProductModalCart}/>
                            )
                        })
                    }
 
                    <Link to="/productos">
                        <div className={styles.price}> <p>Agregar mas productos</p></div>
                    </Link>
                    <div className={styles.price} style={{marginTop:"1rem"}} onClick={()=>props.resetCart()}> <p>Vaciar Carrito</p></div>
                <div className={styles.containerDisconts}>
                    <div className={styles.containerSubTotalCart}>
                        <h3>Subtotal (sin envio):</h3>
                        <span>${(props.subtotal).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <div className={styles.containerSubTotalCart}>
                        <h3>{props.total>0 ? parseFloat((100-props.total*100/props.subtotal).toFixed(2))+ " % OFF": "- %"}</h3>
                        <span>$ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                </div>
                <div className={styles.containerShip}>
                    <h3>Formas de entrega:</h3>
                    <div> 
                        <p className={styles.textShipping}>-Retiro en Local</p>              
                    </div>
                    <div>        
                        <p>-Envio a domicilio Gratis-Entrega a partir de 5 dias hábiles</p>                   
                    </div>
                </div>
                <div className={styles.containerTotal}>
                    <h3>TOTAL:</h3>
                    <span>${(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                        <div onClick={endShop} className={styles.price}> <p>Finaliza Compra</p></div>

                    </>
                    )
                }
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    cartProduct:state.shopCart.shopCart,
    total:state.shopCart.total,
    subtotal:state.shopCart.subtotal
    }
  }
  const mapDispatchToProps ={
   /*  addProduct:shopCartActions.addToCart, */
    deleteProduct:shopCartActions.deleteToCart,
   resetCart:shopCartActions.resetCart,
   product:productsActions.product  
  }

export default connect(mapStateToProps,mapDispatchToProps)(ModalCart)