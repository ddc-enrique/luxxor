import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
// import styles from "../styles/modal2.module.css";
import { connect } from "react-redux";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"
import shopCartActions from "../redux/actions/shopCartActions"
import {  XCircleFill } from 'react-bootstrap-icons'
import productsActions from "../redux/actions/productsActions";
 
const ModalCart = (props) =>{
    const [products,setProducts]=useState([])
    const[products2,setProducts2]=useState([])
    const[loading,setLoading]=useState(true)
    const[total,setTotal]=useState(0)
    let aux
    console.log(props.subtotal)
    console.log(props.total)
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
        setTimeout(()=>{
            setLoading(!loading)  
        },500)
    },[])
    console.log(products)

     const DeleteProductModalCart=(id,deleteAll,price,quantity,discount)=>{
        props.deleteProduct(id,deleteAll,price,quantity,discount)
        setProducts(products.filter(product=>product._id!==id))
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
               { !products.length ?
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
                                <>
                                    <CardProductCart sale={false} product={product} deleteProduct={props.deleteProduct} setTotal={setTotal} total={total} DeleteProductModalCart={DeleteProductModalCart}/>
                                {/* <h1>kjhkjhj</h1> */}
                                </>
                            )
                        })
                    }
                    <Link to="/productos">
                        <div className={styles.price}> <p>Agregar mas productos</p></div>
                    </Link>
                <div className={styles.containerDisconts}>
                    <div className={styles.containerSubTotalCart}>
                        <h3>Subtotal (sin envio):</h3>
                        <span>${props.subtotal}</span>
                    </div>
                    <div className={styles.containerSubTotalCart}>
                        <h3>{props.total>0 ? parseFloat((100-props.total*100/props.subtotal).toFixed(2))+ " % OFF": "- %"}</h3>
                        <span>$ {props.total}</span>
                    </div>
                </div>
                <div className={styles.containerShip}>
                    <h3>Seleccione una forma de entrega:</h3>
                    <div>                   
                        <input type="radio" id="pickIt" name="shipping" value={false} defaultChecked/>
                        <label htmlFor="pickIt"> Retiro en Local</label>                   
                    </div>
                    <div>                
                        <input type="radio" id="ship" name="shipping" value={true} />
                        <label htmlFor="ship"> Envio a domicilio-Entrega a partir de 5 dias hábiles</label>                 
                    </div>
                </div>
                <div className={styles.containerTotal}>
                    <h3>TOTAL:</h3>
                    <span>${props.total}</span>
                </div>
                <Link to="/checkout">
                        <div className={styles.price}> <p>Finaliza Compra</p></div>
                </Link>
                    </>
                    )
                }
            </div>
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
    /* resetCart:shopCartActions.resetCart, */
   product:productsActions.product  
  }

export default connect(mapStateToProps,mapDispatchToProps)(ModalCart)