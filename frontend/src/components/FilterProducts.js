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

    const handleChange = () => {

    }

    return (
        <div className={styles.inputFilterContain}>
            <Toaster />
            <h2>Filtrar por:</h2>
            <div className={styles.inputsFilter}>
                <h3>Marca</h3>
                {brands.map( brand => (
                    <SwitchRadio 
                        key={brand._id}
                        field={brand}
                    />
                ))}
            <h3>Categoria</h3>
            <div className={styles.switch}>
              <label>
                <span>Option 1</span>
                <Switch
                  onChange={handleChange}
                  
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#f48f31'}
                />
              </label>
            </div>
            <div className={styles.switch}>
              <label>
                <span>Option 1</span>
                <Switch
                  onChange={handleChange}
                  
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#f48f31'}
                />
              </label>
            </div>
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
