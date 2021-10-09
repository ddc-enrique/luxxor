import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useHistory } from 'react-router'
import Switch from "react-switch"
import styles from "../styles/productList2.module.css"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import SwitchRadio from "./SwitchRadio"


const FilterProducts = (props) => {
    const history = useHistory()
    const [categories, setCategories] = useState(props.categories)
    const [brands, setBrands] = useState(props.brands)

    useEffect(()=>{    
        const getAllBrands = async () => {
            try {        
                if(!brands.length){
                    let response = await props.getBrands()
                    setBrands(response)
                }
            } catch (error) {
                toast.error("Error de conexión, sera redirigido a Home")
                history.push("/")
            }
        }        
        getAllBrands()

        const getAllCategories = async () => {
            try {        
                if(!categories.length){
                    let response = await props.getCategories()
                    setCategories(response)
                }
            } catch (error) {
                toast.error("Error de conexión, sera redirigido a Home")
                history.push("/")
            }
        }
        getAllCategories()
    }, [])

    return (
        <div className={styles.inputFilterContain}>
            <Toaster />
            <h2>Filtrar por:</h2>
            <div className={styles.inputsFilter}>
                    <h3>Marca</h3>
                    <div
                        className={styles.switchContainer}
                    >
                        <label htmlFor="allBrands">Todas</label>
                        <input 
                            type="radio"
                            name="brand"
                            id="allBrands"
                            className={styles.switch}
                            defaultChecked
                        />
                    </div>
                    {brands.map( brand => (
                        <div
                            className={styles.switchContainer}
                            key={brand._id}
                        >
                            <label htmlFor={brand._id}>{brand.name}</label>
                            <input 
                                type="radio"
                                name="brand"
                                id={brand._id}
                                className={styles.switch}
                            />
                        </div>
                    ))}
                <h3>Categoria</h3>
                    <div
                        className={styles.switchContainer}
                    >
                        <label htmlFor="allCategories">Todas</label>
                        <input 
                            type="radio"
                            name="category"
                            id="allCategories"
                            className={styles.switch}
                            defaultChecked
                        />
                    </div>
                    {categories.map( category => (
                        <div
                            className={styles.switchContainer}
                            key={category._id}
                        >
                            <label htmlFor={category._id}>{category.name}</label>
                            <input 
                                type="radio"
                                name="category"
                                id={category._id}
                                className={styles.switch}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )

}

const mapDispatchToProps = {
    getCategories: productsActions.categories,
    getBrands: productsActions.brands
}

const mapStateToProps = (state) => {
    return{
      brands: state.products.brands,
      categories: state.products.categories,
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts)
