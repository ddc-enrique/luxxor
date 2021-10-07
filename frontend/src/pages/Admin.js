import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Admin = () => {
  const data = [
    {
      name: "Notebook",
      price: 120000,
      stock: 100,
      color: "red",
      photos: [
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
      ],
      dataShets: [{ optionName: "Memoria Ram", optionValue: "8GB" }],
      description: "La mejor notebook del universo",
      discount: 10,
      category: "Informática",
      brand: "HP",
    },
    {
      name: "Notebook",
      price: 120000,
      stock: 100,
      color: "red",
      photos: [
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
      ],
      dataShets: [{ optionName: "Memoria Ram", optionValue: "8GB" }],
      description: "La mejor notebook del universo",
      discount: 10,
      category: "Informática",
      brand: "HP",
    },
    {
      name: "Notebook",
      price: 120000,
      stock: 100,
      color: "red",
      photos: [
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
        "https://i.postimg.cc/wT9pxqqt/1000x1000_1-removebg-preview.png",
      ],
      dataShets: [{ optionName: "Memoria Ram", optionValue: "8GB" }],
      description: "La mejor notebook del universo",
      discount: 10,
      category: "Informática",
      brand: "HP",
    },
  ];

  return (
    <div className={styles.divContainer}>
      <header className={styles.headerAdmin}>
        <Link to="/">
          <h1>
            Lu<span className={styles.orange}>x</span>
            <span className={styles.violet}>x</span>or
          </h1>
        </Link>
      </header>
      <div className={styles.containerAdmin}>
        <nav className={styles.navAdmin}>
          <Link to="/admin">
            <div
              className={styles.icon}
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/CLBqjvWy/home.png')",
              }}
            ></div>{" "}
            <span>Home</span>{" "}
          </Link>
          <Link to="#">
            <div
              className={styles.icon}
              style={{
                backgroundImage: "url('https://i.postimg.cc/Y9rFYtw8/add.png')",
              }}
            ></div>
            <span>Agregar Nuevo</span>{" "}
          </Link>
          <Link to="#">
            <div
              className={styles.icon}
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/prynckrF/category.png')",
              }}
            ></div>
            <span>Categorias</span>
          </Link>
          <Link to="#">
            <div
              className={styles.icon}
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/Hx6ytFYm/product.png')",
              }}
            ></div>
            <span>Productos</span>
          </Link>
        </nav>
        <div className={styles.containerSections}>
          <section className={styles.addNew}>
            <div>
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                }}
              ></div>
              <h3>Agregar nuevo</h3>
            </div>
            <div className={styles.formNew}>
              <div className={styles.containerFiles}>
                <div
                  className={styles.photos}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/k5dKMx10/img.png')",
                  }}
                >
                  <input type="file" name="name" />{" "}
                </div>
                <div
                  className={styles.photos}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/k5dKMx10/img.png')",
                  }}
                >
                  <input type="file" name="name" />{" "}
                </div>
                <div
                  className={styles.photos}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/k5dKMx10/img.png')",
                  }}
                >
                  <input type="file" name="name" />{" "}
                </div>
              </div>
              <div className={styles.containerAllInputs}>
                <div className={styles.containerInputs}>
                  <label for="name">Nombre</label>
                  <input type="text" name="name" />
                </div>
                <div className={styles.containerInputs}>
                  <label for="color">Categoria</label>
                  <select className={styles.select}>
                    <option value="informática">Informática</option>
                    <option>Informática</option>
                    <option>Informática</option>
                  </select>
                </div>
                <div className={styles.containerInputs}>
                  <label for="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    resize="none"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <div className={styles.containerInputs}>
                  <label for="price">Precio</label>
                  <input type="number" name="price" />
                </div>
                <div className={styles.containerInputs}>
                  <label for="discount">Descuento</label>
                  <input type="number" name="discount" />
                </div>
                <div className={styles.containerInputs}>
                  <label for="brand">Marca</label>
                  <input type="text" name="brand" />
                </div>
                <div className={styles.containerInputs}>
                  <label for="stock">Stock</label>
                  <input type="number" name="stock" />
                </div>
                <div className={styles.containerInputs}>
                  <label for="color">Color</label>
                  <input type="text" name="color" />
                </div>
                <div className={styles.containerInputs}>
                  <button>Enviar</button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.search}>
            <div>
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                }}
              ></div>
              <h3>Buscar</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label for="search">Buscar Producto</label>
                <input type="text" name="search" />
              </div>
              <div className={styles.containerProducts}>
                {data.map((product, index) => (
                  <div className={styles.boxProduct} key={index}>
                    <div className={styles.titleProduct}>
                      <div
                        className={styles.imageProduct}
                        style={{ backgroundImage: `url(${product.photos[0]})` }}
                      ></div>
                      <h3>{product.name}</h3>
                      <div className={styles.cointanerEdit}>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                          }}
                        ></div>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p>{product.description}</p>
                    <div className={styles.containerInfo}>
                      <div>
                        <p>{product.brand}</p>
                      </div>
                      <div>
                        <p>{product.brand}</p>
                      </div>
                      <div>
                        <p>$ {product.price} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.lastAdded}>
            <div>
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                }}
              ></div>
              <h3>Agregados Recientemente</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerProducts}>
                {data.map((product, index) => (
                  <div className={styles.boxProduct} key={index}>
                    <div className={styles.titleProduct}>
                      <div
                        className={styles.imageProduct}
                        style={{ backgroundImage: `url(${product.photos[0]})` }}
                      ></div>
                      <h3>{product.name}</h3>
                      <div className={styles.cointanerEdit}>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                          }}
                        ></div>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                          }}
                        ></div>
                      </div>
                    </div>
                    <p>{product.description}</p>
                    <div className={styles.containerInfo}>
                      <div>
                        <p>{product.brand}</p>
                      </div>
                      <div>
                        <p>{product.brand}</p>
                      </div>
                      <div>
                        <p>$ {product.price} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Admin;
