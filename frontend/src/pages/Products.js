import React, { useState } from "react"
import Product from "../components/Product"
import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import styles from "../styles/productList.module.css"
import Switch from "react-switch"
import { Link } from "react-router-dom"

const Products = () => {
  const [checked, setChecked] = useState(false)
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

  const handleChange = (checked) => {
    setChecked(checked)
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.inputFilterContain}>
          <h2>Filtrar por:</h2>
          <div className={styles.inputsFilter}>
            <h3>Marca</h3>
            <div className={styles.switch}>
              <label>
                <span>Option 1</span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
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
                  checked={checked}
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
                  checked={checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#f48f31'}
                />
              </label>
            </div>

            {/* <input
              type="text"
              // className={styles.inputTypes}
              placeholder="Marca"
              name="marca"
            /> */}
            <h3>Categoria</h3>
            <div className={styles.switch}>
              <label>
                <span>Option 1</span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
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
                  checked={checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#f48f31'}
                />
              </label>
            </div>
          </div>
        </div>
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
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
                <p className={styles.btnViewMore}>Ver +</p>
              </div>
            </div>
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
                <p className={styles.btnViewMore}>Ver +</p>
              </div>
            </div>
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
                <p className={styles.btnViewMore}>Ver +</p>
              </div>
            </div>
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
                <p className={styles.btnViewMore}>Ver +</p>
              </div>
            </div>
            <div className={styles.cardProduct}>
              <div className={styles.containPrice}>
                <p>$282000</p>
                <div>
                  <span>Off</span>
                  <p>%10</p>
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
                <p className={styles.btnViewMore}>Ver +</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products
