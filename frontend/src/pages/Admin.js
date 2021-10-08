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


  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    color: "",
    photos: [],
    dataSheet: {
      optionName: "",
      optionValue: "",
    },
    description: "",
    discount: "",
    category: "",
    brand: ""
  })


  const newProductHandler = (e) => {
    if (e.target.name === "optionName"){
      setNewProduct({...newProduct, dataSheet: {optionName: e.target.value}})
    }else if  (e.target.name === "optionValue"){
      setNewProduct({...newProduct, dataSheet: {optionValue: e.target.value}})
    }else
      setNewProduct({...newProduct, [e.target.name]: e.target.value})
  }



  const [inputFields, setInputFields] = useState([
    {optionName: "", optionValue: ""},
  ])

  const newInput = () =>{
    setInputFields([...inputFields, {optionName: "", optionValue: ""}])
  }

  const removeInput = (index) =>{
    const input = [...inputFields]
    input.splice(index, 1)
    setInputFields(input)
  }


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
        <div className={styles.containerNav}>
          <nav className={styles.navAdmin}>
            <Link to="/admin">
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/CLBqjvWy/home.png')",
                }}
              ></div>
              <span>Home</span>
            </Link>
            <Link to="#">
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/pLTnvRr7/brand.png)",
                }}
              ></div>
              <span>Marcas</span>
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
        </div>
        <div className={styles.containerSections}>
          <section className={styles.addNew}>
            <div>
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/0NLxdcNK/2-removebg-preview-4.png')",
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
                  <div
                    className={styles.file}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/Y9rFYtw8/add.png')",
                    }}
                  >
                    <input type="file" name="name" />
                  </div>
                </div>
                <div
                  className={styles.photos}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/k5dKMx10/img.png')",
                  }}
                >
                  <div
                    className={styles.file}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/Y9rFYtw8/add.png')",
                    }}
                  >
                    <input type="file" name="name" />
                  </div>
                </div>
                <div
                  className={styles.photos}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/k5dKMx10/img.png')",
                  }}
                >
                  <div
                    className={styles.file}
                    style={{
                      backgroundImage:
                        "url('https://i.postimg.cc/Y9rFYtw8/add.png')",
                    }}
                  >
                    <input type="file" name="name" />
                  </div>
                </div>
              </div>
              <div className={styles.containerAllInputs}>
                <div className={styles.containerInputs}>
                  <label htmlFor="name">Nombre</label>
                  <input id="name" type="text" name="name" onChange={newProductHandler} />
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="color">Categoria</label>
                  <select className={styles.select} onChange={newProductHandler}>
                    <option value="informática">Informática</option>
                    <option>Informática</option>
                    <option>Informática</option>
                  </select>
                </div>
                <div>
                  <p onClick={newInput} style={{cursor: "pointer"}}>+ Agregar input</p>
                  {inputFields.map((input, index)=>{
                   return <div>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionName">Carácterística</label>
                        <input id="optionName" type="text" name={input.optionName} onChange={newProductHandler} />
                      </div>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionValue">Descripción de car.</label>
                        <input id="optionValue" type="text" name={input.optionValue} onChange={newProductHandler} />
                      </div>
                      <p onClick={()=>removeInput(index)} style={{cursor: "pointer"}}>- Borrar input</p>
                  </div>
                  
                  })}
                  
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    onChange={newProductHandler}
                    id="description"
                    name="description"
                    resize="none"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="price">Precio</label>
                  <input id="price" type="number" name="price" onChange={newProductHandler} />
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="discount">Descuento</label>
                  <input id="discount" type="number" name="discount" onChange={newProductHandler}/>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="brand">Marca</label>
                  <input id="brand" type="text" name="brand" onChange={newProductHandler}/>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="stock">Stock</label>
                  <input id="stock" type="number" name="stock" onChange={newProductHandler}/>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="color">Color</label>
                  <input id="color" type="text" name="color" onChange={newProductHandler}/>
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
                    "url('https://i.postimg.cc/h47DcVZB/search.png')",
                }}
              ></div>
              <h3>Buscar</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="search">Buscar Producto</label>
                <input id="search" type="text" name="search" />
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
                              "url('https://i.postimg.cc/bN0rQQhh/editar.png')",
                          }}
                        ></div>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/C51Bv5HN/borrar.png')",
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
                    "url('https://i.postimg.cc/Vv1mKVqW/reciente.png')",
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
                              "url('https://i.postimg.cc/bN0rQQhh/editar.png')",
                          }}
                        ></div>
                        <div
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/C51Bv5HN/borrar.png')",
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
