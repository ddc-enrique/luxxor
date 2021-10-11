import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { XCircleFill } from 'react-bootstrap-icons'
import styles from "../styles/modalEdit.module.css"
import { useEffect, useState } from "react"

const EditProduct = (props) => {

    const [product, setProduct] = useState({})

    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        const getOneProduct = async ()=>{

            let response = await props.getOneProduct(props.id)
            if (response.data.success){
                setProduct(response.data.response)
            }else 
            console.log("error") //poner tostada
        }
        getOneProduct()
          setLoading(true)
    }, [])


    const [productEdit, setProductEdit] = useState({
        name: "",
        stock: "",
        price: "",
        color: "",
        dataSheet: [{
          optionName: "",
          optionValue: "",
        }],
        description: "",
        discount: "",
        category: "",
        brand: ""
      })



  const handleEdit = async () => {
    let response = await props.editProduct(props.id)
    if (response.success){
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
                
                    <input defaultValue={product.name}/>
                    <div>
                        <select name="brands">
                            <option> Seleccione marca</option>
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
                    <div >
                    {product.dataSheet && product.dataSheet.map(data=>
                        <div className={styles.data}>
                            <input defaultValue={data.optionName} />
                            <input defaultValue={data.optionValue} />
                        </div>
                    )}
                    </div>
                    <input defaultValue={product.price}/>
                    <input defaultValue={product.discount}/>
                    <select>
                        <option>Seleccione categoría</option>
                    {props.categories.map(category => (
                        <option
                        key={category._id}
                        value={category._id}
                        >{category.name}</option>
                    ))}
                    </select>
                    <input defaultValue={product.stock}/>
                    <input defaultValue={product.color}/>
                    <div className={styles.button}>
                        <button onclick={()=>handleEdit}>Actualizar</button>
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



export default connect(null, mapDispatchToProps)(EditProduct)