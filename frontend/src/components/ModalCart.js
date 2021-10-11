import React,  { useState, useEffect, useRef }from "react";
import styles from "../styles/modalCart.module.css";
// import styles from "../styles/modal2.module.css";
import { connect } from "react-redux";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"
import shopCartActions from "../redux/actions/shopCartActions"
import productsActions from "../redux/actions/productsActions";
 
const ModalCart = (props) =>{
    const [products,setProducts]=useState([])
    const[products2,setProducts2]=useState([])
    const[loading,setLoading]=useState(true)
    const[total,setTotal]=useState(0)
    let aux
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

   if(loading){
        return(
            <div className={styles.containerGeneral}>
            <h1>LOADING</h1>
            </div>
        )
    } 
    return(
        <div className={styles.containerGeneral}>
            <div className={styles.containerCart}>
                <img onClick={()=>props.setModalCart(false)} className={styles.iconClose} src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"/>
                
                <h2>Carrito de Compras</h2>
                <div className={styles.containerSubTitle}>
                    <h3>PRODUCTO</h3>
                    <h3>SUBTOTAL</h3>
                </div>
                    {
                        products.map(product=>{                          
                            return(
                                <>
                                    <CardProductCart sale={false} product={product} deleteProduct={props.deleteProduct} setTotal={setTotal} total={total}/>
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
                        <span>${props.total}</span>
                    </div>
                    <div className={styles.containerSubTotalCart}>
                        <h3>15%OFF</h3>
                        <span>$42.330</span>
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
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    cartProduct:state.shopCart.shopCart,
    total:state.shopCart.total
    }
  }
  const mapDispatchToProps ={
   /*  addProduct:shopCartActions.addToCart, */
    deleteProduct:shopCartActions.deleteToCart,
    /* resetCart:shopCartActions.resetCart, */
   product:productsActions.product  
  }

export default connect(mapStateToProps,mapDispatchToProps)(ModalCart)