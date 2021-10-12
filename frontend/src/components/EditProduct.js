import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { XCircleFill } from 'react-bootstrap-icons'
import styles from "../styles/modalEdit.module.css"
import { useEffect, useState } from "react"


const EditProduct = (props) => {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [productToEdit, setProductToEdit] = useState({})

    useEffect(()=>{
        const getOneProduct = async ()=>{

            let response = await props.getOneProduct(props.id)
            if (response.data.success){
                let data = response.data.response
                setProduct(data)
                setProductToEdit({
                    name: data.name,
                    stock: data.stock,
                    price: data.price,
                    color: data.color,
                    dataSheet: data.dataSheet,
                    description: data.description,
                    discount: data.discount,
                    category: data.category,
                    brand: data.brand
                })
            }else 
            console.log("error") //poner tostada
            setLoading(true)
        }
        getOneProduct()      
    }, [])  

      const productToEditHandler = (index, e) => { 
        const values = product.dataSheet && [...product.dataSheet]
        if (e.target.name === "optionName") {
          values[index][e.target.name]=e.target.value
          setProductToEdit({...productToEdit, dataSheet: [...values]})
        }else if  (e.target.name === "optionValue"){
          values[index][e.target.name]=e.target.value
          setProductToEdit({...productToEdit, dataSheet: [...values]})
        }else {
          setProductToEdit({...productToEdit, [e.target.name]: e.target.value})
        }
      }

  const handleEdit = async () => {
    let response = await props.editProduct(props.id, productToEdit, props.token)
    if (response.data.success){
        props.setRender(!props.render)
        console.log("Se actualizó con éxito")//poner tostada
        props.setModalEdit(false)
    }else{
        console.log(response.data)//poner tostada
    }
  }


    return (
        <div className={styles.container}>
            <div className={styles.editContainer}>
                <XCircleFill 
                    className={styles.close}
                    onClick={()=>props.setModalEdit(false)}
                />  
                    <h3>Editar Producto</h3>
                    <div className={styles.containerInputs}>
                        <label htmlFor="name">Nombre</label>
                        <input defaultValue={product.name} onChange={(e)=>productToEditHandler("index", e)} name="name"/>
                    </div>
                    
                    <div className={styles.containerInputs}>
                        <label htmlFor="brands">Marca</label>
                        <select name="brands" onChange={(e)=>productToEditHandler("index", e)}>
                            {props.brands.map(brand=> (
                            <option
                                key={brand._id}
                                value={brand._id}
                            >
                                {brand.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    
                    {product.dataSheet && product.dataSheet.map((data, index)=>
                        <div >
                            <div className={styles.containerInputs}>
                                <label htmlFor="optionName">Característica</label>
                                <input defaultValue={data.optionName} onChange={(e)=>productToEditHandler(index, e)} name="optionName"/>
                            </div>
                            <div className={styles.containerInputs}>
                                <label htmlFor="optionValue">Descripción</label>
                                <input defaultValue={data.optionValue} onChange={(e)=>productToEditHandler(index, e)} name="optionValue"/>
                            </div>
                        </div>
                    )}
                    <div className={styles.containerInputs}>
                        <label htmlFor="price">Precio</label>
                        <input defaultValue={product.price} onChange={(e)=>productToEditHandler("index", e)} name="price"/>
                    </div>
                    <div className={styles.containerInputs}>
                        <label htmlFor="discount">Descuento %</label>
                    <input defaultValue={product.discount} onChange={(e)=>productToEditHandler("index", e)} name="discount"/>
                    </div>
                    <div className={styles.containerInputs}>
                        <label htmlFor="category">Categoría</label>
                        <select onChange={(e)=>productToEditHandler("index", e)} name="category">
                        {props.categories.map(category => (
                            <option
                            key={category._id}
                            value={category._id}
                            >{category.name}</option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.containerInputs}>
                        <label htmlFor="stock">Stock</label>
                        <input defaultValue={product.stock} onChange={(e)=>productToEditHandler("index", e)} name="stock"/>
                    </div>
                    <div className={styles.containerInputs}>
                        <label htmlFor="color">Color</label>
                    <input defaultValue={product.color} onChange={(e)=>productToEditHandler("index", e)} name="color"/>
                    </div>
                    <div className={styles.button}>
                        <button onClick={handleEdit}>Actualizar</button>
                        <button onClick={()=>props.setModalEdit(false)}>Cancelar</button>
                    </div>

            </div>
        </div>
    )
}

const mapDispatchToProps = {
    editProduct: productsActions.editProduct,
    getOneProduct: productsActions.product,
    getCategories: productsActions.categories,
    getBrands: productsActions.brands,
}

const mapStateToProps = (state) => {
    return{
        token: state.users.token
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)