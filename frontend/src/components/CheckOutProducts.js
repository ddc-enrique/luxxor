import React,  { useState, useEffect}from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom"
import shopCartActions from "../redux/actions/shopCartActions"
import productsActions from "../redux/actions/productsActions";

const CheckOutProducts = (props) =>{

    const [products,setProducts]=useState([])
    const[products2,setProducts2]=useState([])
    const[loading,setLoading]=useState(true)
    const[total,setTotal]=useState(0)
    let aux
    var aux_array=[]
    console.log(total)
    useEffect(()=>{
        /* console.log(props.cartProduct) */
        props.cartProduct.forEach(item=>{
            props.product(item.productId)
            .then((res)=>{
                aux= {...res.data.response,quantity:item.quantity}
              /*   products4=[...products,aux]
                console.log(products4)
                 setProducts(products4)  */
                 /* aux_array=aux_array.push(aux)
                 setProducts(aux_array) */
                 setProducts2(products2.push(aux))
                 setProducts(products2) 
                 /* setLoading(!loading) */
            })
            .catch(e=>console.log(e))
        }) 
        setTimeout(()=>{
            setLoading(!loading)  
        },500)
           
    },[])


    return(
        <>       
            
            <div className={styles.containerCart}>
            {products.map(product=>{                          
                    return(
                        <>
                            <CardProductCart sale={false} product={product} deleteProduct={props.deleteProduct} setTotal={setTotal} total={total}/>
                        {/* <h1>kjhkjhj</h1> */}
                        </>
                    )
                })
            }
                
            </div>
            <div className={styles.formData}>
                <h3>DATOS DEL DESTINATARIO</h3>
                <div className={styles.boxInputs}>
                    <input type="text"  name="firstName" placeholder="Nombre" />
                    <input type="text"  name="lastName" placeholder="Apellido" />
                </div>
                <div className={styles.boxInputs}>
                    <input type="text"  name="dni" placeholder="DNI" />
                    <input type="text"  name="phone" placeholder="Teléfono" />                       
                </div>
            </div>
            <div className={styles.formData}>
                <h3>DIRECCION DE ENTREGA</h3>
                <div className={styles.boxInputs}>
                    <input type="text"  name="adress" placeholder="Dirección" />
                    <input type="text"  name="zipCode" placeholder="Departamento(opcional)" />
                </div>
                <div className={styles.boxInputs}>
                    <input type="text"  name="city" placeholder="Ciudad" />
                    <input type="number"  name="zipCode" placeholder="Código Postal" />
                </div>
            </div>
            <div className={styles.containerTotal}>
                <h3>TOTAL: $$$$</h3>
            </div>

            <div className={styles.containerSend}>
                <button onClick={()=>props.setScreen(2)} className={styles.buttonSend}>Continuar Compra</button>
            </div>
        </>
    )

}


const mapStateToProps = (state) => {
    return {
        cartProduct:state.shopCart
    }
}
const mapDispatchToProps ={
    /*  addProduct:shopCartActions.addToCart, */
     deleteProduct:shopCartActions.deleteToCart,
     /* resetCart:shopCartActions.resetCart, */
    product:productsActions.product  
   }

export default connect(mapStateToProps,mapDispatchToProps)(CheckOutProducts)