import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useHistory } from 'react-router'
import styles from "../styles/productList2.module.css"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"


const FilterProducts = (props) => {
    const history = useHistory()
    const [categories, setCategories] = useState(props.categories)
    const [brands, setBrands] = useState(props.brands)
    const [activeBrand, setActiveBrand] = useState("allBrands")
    const [activeCategory, setActiveCategory] = useState("allCategories")

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
        props.setLoadingFilter(false)
    }, [])

    useEffect(() => {
        let flagAllBrands = activeBrand === "allBrands"
        let flagAllCategories = activeCategory === "allCategories"
        let fp = props.products.filter( product => {
            if (flagAllBrands && flagAllCategories) return true
            if(activeCategory === product.category._id && flagAllBrands) return true
            if(activeBrand === product.brand._id && flagAllCategories) return true
            if( activeCategory === product.category._id && activeBrand === product.brand._id ) return true
            return false
        })
        props.setFilteredProducts(fp)
    },[activeBrand, activeCategory])
    const[visible, setVisible] = useState(false)
        const clickHandlerFilter = () =>{
            setVisible(!visible)
        }

    return (
        <div className={styles.inputFilterContain}>
            <Toaster />
            <h2 onClick={clickHandlerFilter}>Filtrar:</h2>
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
                                onChange={ () => setActiveBrand("allBrands")}
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
                                    onChange={ () => setActiveBrand(brand._id)}
                                />
                            </div>
                        ))}
                    <h3 className={styles.optionsFilter}>Categoria</h3>
                        <div
                            className={styles.switchContainer}
                        >
                            <label htmlFor="allCategories">Todas</label>
                            <input 
                                type="radio"
                                name="category"
                                id="allCategories"
                                className={styles.switch}
                                onChange={ () => setActiveCategory("allCategories")}
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
                                    onChange={ () => setActiveCategory(category._id)}
                                />
                            </div>
                        ))}
                    </div>
                {visible &&<div className={styles.inputsFilter2}>
                                        <h3 className={styles.optionsFilter}>Marca</h3>
                                        <div
                                            className={styles.switchContainer}
                                        >
                                            <label htmlFor="allBrands">Todas</label>
                                            <input 
                                                type="radio"
                                                name="brand"
                                                id="allBrands"
                                                className={styles.switch}
                                                onChange={ () => setActiveBrand("allBrands")}
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
                                                    onChange={ () => setActiveBrand(brand._id)}
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
                                                onChange={ () => setActiveCategory("allCategories")}
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
                                                    onChange={ () => setActiveCategory(category._id)}
                                                />
                                            </div>
                                        ))}
                </div>}
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
