import React from "react"
import Product from "../components/Product"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import styles from "../styles/productList.module.css"

const Products = () => {
  const data = [
    {
      name: "Notebook",
      price: 12000,
      color: "Grey",
      photos: [
        {
          image: "https://i.postimg.cc/sg5jwZQH/Nombre-5.png",
        },
        {
          image: "https://i.postimg.cc/jj5RTrz0/Nombre-7.png",
        },
        { image: "https://i.postimg.cc/JzBwmcnx/Nombre-9.png" },
      ],
      description:
        "Fragmento de un escrito con unidad temática, que queda diferenciado del resto de fragmentos por un punto.",
      discount: 20,
      category: "Informática",
      brand: "Nova",
    },
  ]

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <div>
            <h2>Marca</h2>
            <input
              type="text"
              // className={styles.inputTypes}
              placeholder="Marca"
              name="marca"
            />
            <h2>Categoria</h2>
            <input
              type="text"
              // className={styles.inputTypes}
              placeholder="categoria"
              name="categoria"
            />
            <h2>Precio</h2>
            <select
              name="precio"
              // value={}
              // className=""
              placeholder="precio"
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
        <div className={styles.containProducts}>
          <h2>PRODUCTOS</h2>

          <div className={styles.containPrice}>
            <p>282000</p>
            <p>%10</p>
          </div>
          <div
            className={styles.photo}
            style={{
              backgroundImage: `url("https://home.ripley.com.pe/Attachment/WOP_5/2004209413829/2004209413829-1.jpg")`,
            }}
          ></div>
         
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products
