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
  useEffect(()=> {
    const getAllProducts = async() =>{
      if(!products.length) {
        try {
          let response = await props.getProducts()
          if(!Array.isArray(response)) throw new Error(response.response)         
          setProducts(response)
        } catch (error) {
          toast.error(error)
        }                
      }
    }
    getAllProducts()
  },[])

  return (
    <>
      <Toaster />
      <Navbar />
      <div className={styles.container}>
        <FilterProducts />
        <div className={styles.productsSection}>
          <div className={styles.inputSelect}>
            <div>
            <h2>Ordenar por:</h2>
            <select
              name="precio"
              // value={}
              className={styles.selectInput}
              placeholder="precio"
            >
              <option value="volvo"  default>Selecciona</option>
              <option value="volvo">Mayor precio</option>
              <option value="saab">Menor precio</option>
              <option value="mercedes">A-Z</option>
              <option value="audi">Z-A</option>
            </select>
            </div>
          </div>
          <div className={styles.containerProducts}>
            {products.map(product => (
              <div className={styles.cardProduct}>
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
