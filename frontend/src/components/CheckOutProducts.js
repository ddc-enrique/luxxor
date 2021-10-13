import React, { useState, useEffect } from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import CardProductCart from "./CardProductCart";
import { Link } from "react-router-dom";
import shopCartActions from "../redux/actions/shopCartActions";
import productsActions from "../redux/actions/productsActions";

const CheckOutProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [dataShipping, setDataShipping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  let aux;
  var aux_array = [];
  const [dataAddress,setDataAddress]=useState({})
  useEffect(() => {
    /* console.log(props.cartProduct) */
    props.cartProduct.forEach((item) => {
      props
        .product(item.productId)
        .then((res) => {
          aux = { ...res.data.response, quantity: item.quantity };
                 setProducts2(products2.push(aux))
                 setProducts(products2) 
            })
            .catch(e=>console.log(e))
        }) 
    props.getUserData(props.id,props.token)
        .then(res=>{
            console.log(res)
            setDataAddress(res)
        })
        .catch(e=>console.log(e))

        setTimeout(()=>{
            setLoading(!loading)  
        },500)
           
    },[])


    /* return(
        <>       
            
            <div className={styles.containerCart}>
            {products.map(product=>{                          
                    return(
                        <>
                            <CardProductCart sale={false} product={product} deleteProduct={props.deleteProduct} setTotal={setTotal} total={total}/>
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
    ) */

  return (
    <>
      <div className={styles.containerCart}>
        {products.map((product) => {
          return (
            <>
              <CardProductCart
                sale={false}
                product={product}
                deleteProduct={props.deleteProduct}
                setTotal={setTotal}
                total={total}
              />
            </>
          );
        })}
      </div>
      <div className={styles.formData}>
        <h3>DATOS DEL DESTINATARIO</h3>
        <div className={styles.boxInputs}>
          <input style={{color:"#FFF"}}type="text" name="firstName" placeholder="Nombre" defaultValue={props.firstName} />
          <input style={{color:"#FFF"}} type="text" name="lastName" placeholder="Apellido" defaultValue={props.lastName}/>
        </div>
        <div className={styles.boxInputs}>
          <input style={{color:"#FFF"}} type="text" name="dni" placeholder="DNI"defaultValue={props.dni} />
          <input style={{color:"#FFF"}} type="text" name="phone" placeholder="Teléfono" defaultValue={dataAddress.phone} />
        </div>
      </div>
      <div className={styles.formSending}>
        <input
          type="radio"
          value="true"
          name="shipping"
          onClick={() => setDataShipping(true)}
        />
      <label formData='shipping'>Envio a domicilio</label>
        <input
          type="radio"
          value="false"
          name="shipping"
          onClick={() => setDataShipping(false)}
        />
        <label formData='shipping'>Retirar en Sucursal</label>
      </div>
      {dataShipping && (
        <div className={styles.formData}>
          <h3>DIRECCION DE ENTREGA</h3>
          <div className={styles.boxInputs}>
            <input style={{color:"#FFF"}} type="text" name="adress" placeholder="Dirección" defaultValue={dataAddress.address}/>
            <input
            style={{color:"#FFF"}}
              type="text"
              name="zipCode"
              placeholder="Departamento(opcional)"
              defaultValue={dataAddress.optional && dataAddress.optional  }
            />
          </div>
          <div className={styles.boxInputs}>
            <input style={{color:"#FFF"}} type="text" name="city" placeholder="Ciudad" defaultValue={dataAddress.city} />
            <input style={{color:"#FFF"}} type="number" name="zipCode" placeholder="Código Postal" defaultValue={dataAddress.zipCode} />
          </div>
        </div>
      )}
      <div className={styles.containerTotal}>
        <h3>TOTAL: $ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
      </div>

      <div className={styles.containerSend}>
        <button
          onClick={() => props.setScreen(2)}
          className={styles.buttonSend}
        >
          Continuar Compra
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProduct: state.shopCart.shopCart,
    id:state.users.id,
    token:state.users.token,
    lastName:state.users.lastName,
    firstName:state.users.firstName,
    dni:state.users.dni,
    total:state.shopCart.total
  };
};
const mapDispatchToProps = {
  /*  addProduct:shopCartActions.addToCart, */
  deleteProduct: shopCartActions.deleteToCart,
  /* resetCart:shopCartActions.resetCart, */
  product: productsActions.product,
  getUserData:usersAction.getUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutProducts);
