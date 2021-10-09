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
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])
  const [updateOnSort, setUpdateOnSort] = useState(true)
  useEffect(()=> {
    const getAllProducts = async() =>{
      if(!products.length) {
        try {
          let response = await props.getProducts()
          if(!Array.isArray(response)) throw new Error(response.response)         
          setProducts(response)
          setFilteredProducts(response)
          setSortedProducts(response)
        } catch (error) {
          toast.error(error)
        }                
      }
    }
    getAllProducts()
  },[])

  const sortProducts = (e) => {
    console.log(e.target.value)
    switch (e.target.value) {
      case "lowerPrice":
        setSortedProducts(
          filteredProducts.sort((productA, productB) => productA.price - productB.price)
        )
        break;

      case "higherPrice":
        setSortedProducts(
          filteredProducts.sort((productA, productB) => productB.price - productA.price)
        )
        break;
      
      case "A-Z":
        setSortedProducts(
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
        setSortedProducts(
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

      case "mostRelevants": //NO ANDA BIEN        
      default:
        setSortedProducts(filteredProducts)
        break;
    }
    setUpdateOnSort(!updateOnSort)
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
          <div className={styles.containerProducts}>
            {filteredProducts.map(product => (
              <div className={styles.cardProduct} key={product._id}>
                <div className={styles.containPrice}>
                  <p>${(product.price * (1-(product.discount/100))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <div>
                    {product.discount>0 && <p>%{product.discount} Off</p>}
                  </div>
                </div>
                <p>
                  {product.name}
                </p>
                <div className={styles.center}>
                  <div
                    className={styles.photo}
                    style={{
                      backgroundImage: `url("http://localhost:4000/productsPhoto/${product.photos[0]}")`,
                    }}
                  ></div>
                </div>
                <div className={styles.center}>
                  <Link to={`/producto/${product._id}`}>
                    <p className={styles.btnViewMore}>Ver +</p>
                  </Link>
                </div>
              </div>
            ))}
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                <p>%10 Off</p>
                </div>
              </div>
              <p>
                MacBook Air 13.3 Apple M1 8GB 512GB SSD MacOS X 11 Space Gray
              </p>
              <div className={styles.center}>
                <div
                  className={styles.photo}
                  style={{
                    backgroundImage: `url("https://home.ripley.com.pe/Attachment/WOP_5/2004209413829/2004209413829-1.jpg")`,
                  }}
                ></div>
              </div>
              <div className={styles.center}>
                <Link to="/producto">
                  <p className={styles.btnViewMore}>Ver +</p>
                </Link>
              </div>
            </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
