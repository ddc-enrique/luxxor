import React, { useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
// import styles from "../styles/productList.module.css"
import styles from "../styles/productList2.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import FilterProducts from "../components/FilterProducts"
import productsActions from "../redux/actions/productsActions"
import toast, { Toaster } from "react-hot-toast"

const Products = (props) => {
  const [products, setProducts] = useState(props.products)
  const [filteredProducts, setFilteredProducts] = useState(props.products)
  const [updateOnSort, setUpdateOnSort] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    const getAllProducts = async() =>{
      if(!props.products.length) {
        try {
          let response = await props.getProducts()
          if(!Array.isArray(response)) throw new Error(response.response)         
          setProducts(response)
          setFilteredProducts(response)
        } catch (error) {
          toast.error(error)
        }                
      }
    }
    getAllProducts()
    console.log(props.products)
    setLoading(false)
  },[])

  const sortProducts = (e) => {
    console.log(e.target.value)
    switch (e.target.value) {
      case "lowerPrice":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => productA.price - productB.price)
        )
        break;

      case "higherPrice":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => productB.price - productA.price)
        )
        break;
      
      case "A-Z":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA.name > productB.name) {
              return 1;
            }
            if (productA.name < productB.name) {
              return -1;
            }
            return 0;
          })
        )
        break;

      case "Z-A":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA.name < productB.name) {
              return 1;
            }
            if (productA.name > productB.name) {
              return -1;
            }
            return 0;
          })
        )
        break;

      case "mostRelevants":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA._id > productB._id) {
              return 1;
            }
            if (productA._id < productB._id) {
              return -1;
            }
            return 0;
          })
        )
        break;

      default:
        break;
    }
    setUpdateOnSort(!updateOnSort)
  }

  if(loading){
    return <div> Cargando...</div>
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <div className={styles.container}>
        <FilterProducts 
          setFilteredProducts={setFilteredProducts}
          products={products}
        />
        <div className={styles.productsSection}>
          <div className={styles.inputSelect}>
            <div>
            <h2>Ordenar por:</h2>
            <select
              name="precio"
              onChange={sortProducts}
              className={styles.selectInput}
              placeholder="precio"
            >
              <option value="mostRelevants" default>Más Relevantes</option>
              <option value="higherPrice">Mayor precio</option>
              <option value="lowerPrice">Menor precio</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            </div>
          </div>
          <div className={styles.pageContent}>
            {filteredProducts.map(product => (
                    <div className={styles.card}style={{
                      backgroundImage: `url("http://localhost:4000/productsPhoto/${product.photos[0]}")`,
                    }} 
                      key={product._id}
                    >
                        <div className={styles.content}>
                            <h2 className={styles.title}>{product.name}</h2>
                            {product.discount>0 && <p>%{product.discount} Off</p>}
                            <p className={styles.copy}>${(product.price * (1-(product.discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <Link to={`/producto/${product._id}`}> <button className={styles.btn}>Ver +</button></Link>
                      </div>
                    </div>
            ))}
            {
              !filteredProducts.length && 
              <div className={styles.emptyProducts}>
                <p>Ups! No tenemos productos que pasen ese filtro :(</p>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapDispatchToProps = {
  getProducts: productsActions.products,
}

const mapStateToProps = (state) => {
  return{
    brands: state.products,
    categories: state.products,
    products: state.products.products
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
