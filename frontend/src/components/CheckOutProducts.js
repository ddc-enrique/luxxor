import React, { useState, useEffect } from "react";
import styles from "../styles/sale.module.css";
import { connect } from "react-redux";
import usersAction from "../redux/actions/usersAction";
import CardProductCart from "./CardProductCart";
import shopCartActions from "../redux/actions/shopCartActions";
import productsActions from "../redux/actions/productsActions";
import toast, { Toaster } from "react-hot-toast"

const CheckOutProducts = (props) => {
  const {dataShipping, setDataShipping} = props
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  let aux;
  const[dataClient,setDataClient]=useState({firstName: props.firstName, lastName: props.lastName,dni:props.dni, shipping:""} )
  const[dataAddress,setDataAddress]=useState({})
  let field_empty=false
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
            .catch(e=>toast(e.message, {
              icon: "🚫",
              style: {
                borderRadius: "1rem",
                background: "#fff",
                color: "#545454",
              },
            }))
        }) 
    props.getUserData(props.id,props.token)
        .then(res=>{
            setDataAddress(res)
            setDataClient({firstName: props.firstName, lastName: props.lastName,dni:props.dni,phone:res.phone, shipping:""}) 
        })
        .catch(e=>{
          toast(e.message, {
            icon: "🚫",
            style: {
              borderRadius: "1rem",
              background: "#fff",
              color: "#545454",
            },
          })
          
        })

        setTimeout(()=>{
            setLoading(!loading)  
        },500)
           
    },[])

    const DeleteProductModalCart=(id,deleteAll,price,quantity,discount)=>{
      props.deleteProduct(id,deleteAll,price,quantity,discount)
      setProducts(products.filter(product=>product._id!==id))
    } 
    const inputHandler=(e, campo,type)=>{
      if (type==="receiver"){
        setDataClient({
          ...dataClient,
          [campo]: e.target.value
        })
      }else{
        setDataAddress({
          ...dataAddress,
          [campo]:e.target.value
        })
      }
    }
    
    const submitHandler=()=>{
      
      let arr_aux=Object.values(dataAddress).filter((item,index)=>index!==3)
      Object.values(arr_aux).forEach((field_value)=>!field_value && (field_empty = true))
      let inputs=Object.values(dataClient).some((input)=>input==="")      
      /* let inputsShipping=Object.values(dataAddress).filter(item=>item==="optional").some((input)=>input==="")   */
      if(props.cartProduct.length===0){
        toast("Al menos debes tener una unidad en el carrito.", {
          icon: "🚫",
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
      })
      }else if(inputs || dataClient.shipping==="shipping"&&field_empty ){
        toast("Por favor llena todos los campos para continuar.", {
          icon: "🚫",
          style: {
            borderRadius: "1rem",
            background: "#fff",
            color: "#545454",
          },
      })
      }else{
        props.setScreen(2)
      }        
    }


  return (
    <>
      <div className={styles.containerCart}>
        {products.map((product) => {
          return (
            <>
              <CardProductCart
                sale={false}
                product={product}
                DeleteProductModalCart={DeleteProductModalCart}
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
          <input style={{color:"#FFF"}}type="text" name="firstName" placeholder="Nombre" defaultValue={props.firstName} onChange={(e)=>inputHandler(e, 'firstName',"receiver")}/>
          <input style={{color:"#FFF"}} type="text" name="lastName" placeholder="Apellido" defaultValue={props.lastName} onChange={(e)=>inputHandler(e, 'lastName',"receiver")}/>
        </div>
        <div className={styles.boxInputs}>
          <input style={{color:"#FFF"}} type="text" name="dni" placeholder="DNI"defaultValue={props.dni} onChange={(e)=>inputHandler(e, 'dni',"receiver")}/>
          <input style={{color:"#FFF"}} type="text" name="phone" placeholder="Teléfono" defaultValue={dataAddress.phone} onChange={(e)=>inputHandler(e, 'phone',"receiver")}/>
        </div>
      </div>
      <div className={styles.formSending}>
        <input
          type="radio"
          value="shipping"
          name="shipping"
          onChange={(e)=>inputHandler(e, 'shipping',"receiver")}
          onClick={() => setDataShipping(true)}
        />
      <label formData='shipping'>Envio a domicilio (Gratis)</label>
        <input
          type="radio"
          value="pickup"
          name="shipping"
          onChange={(e)=>inputHandler(e, 'shipping',"receiver")}
          onClick={() => setDataShipping(false)}
        />
        <label formData='shipping'>Retirar en Sucursal</label>
      </div>
      {dataShipping && (
        <div className={styles.formData}>
          <h3>DIRECCION DE ENTREGA</h3>
          <div className={styles.boxInputs}>
            <input style={{color:"#FFF"}} type="text" name="adress" placeholder="Dirección" defaultValue={dataAddress.address} onChange={(e) => inputHandler(e, 'address',"info_address")}/>
            <input
            style={{color:"#FFF"}}
              type="text"
              name="zipCode"
              placeholder="Departamento(opcional)"
              onChange={(e) => inputHandler(e, 'optional',"info_address")}
              defaultValue={dataAddress.optional && dataAddress.optional  }
            />
          </div>
          <div className={styles.boxInputs}>
            <input style={{color:"#FFF"}} type="text" name="city" placeholder="Ciudad" defaultValue={dataAddress.city} onChange={(e) => inputHandler(e, 'city',"info_address")}/>
            <input style={{color:"#FFF"}} type="number" name="zipCode" placeholder="Código Postal" defaultValue={dataAddress.zipCode} onChange={(e) => inputHandler(e, 'zipCode',"info_address")} />
          </div>
        </div>
      )}
      <div className={styles.containerTotal}>
        <h3>TOTAL: $ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
      </div>

      <div className={styles.containerSend}>
        <button
          onClick={submitHandler}
          className={styles.buttonSend}
        >
          Continuar Compra
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
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
