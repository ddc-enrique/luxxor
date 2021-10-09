import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import productsActions from "../redux/actions/productsActions";

const Admin = (props) => {
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
    dataSheet: [{
      optionName: "",
      optionValue: "",
    }],
    description: "",
    discount: "",
    category: "",
    brand: ""
  })

  const [inputFields, setInputFields] = useState([
    {optionName: "", optionValue: ""},
  ])

  
  const [categories, setCategories] = useState(props.categories)
  const [brands, setBrands] = useState(props.brands)
  const [products, setProducts] = useState(props.products)
  const [productsFilt, setProductsFilt] = useState(props.products)
  const [productsFiltered, setProductsFiltered] = useState(props.products)
  const [render, setRender] = useState(false)

  useEffect(()=>{
    
    const getAllProducts = async () => {
      if(!products.length){
        
        let response = await props.getAllProducts()
        console.log(response)
        setProducts(response)
        setProductsFiltered(response)
        setProductsFilt(response)
      }
    }
    getAllProducts()
    
    
    const getAllBrands = async () => {
      if(!brands.length){
        let response = await props.getBrands()
        setBrands(response)
      }
    }
    getAllBrands()

    const getAllCategories = async () => {
      if (!categories.length){
        let response = await props.getCategories()
        setCategories(response)
      }
    }
    getAllCategories()

  }, [render])
  
  
  const handle = (e) => {
    setProductsFilt(productsFiltered.filter(item => (item.name.toLowerCase().startsWith(e.target.value.trim().toLowerCase()))))
    
  }

  const newProductHandler = (index, e) => { 
    const values = [...inputFields]
    if (e.target.name === "optionName") {
      values[index][e.target.name]=e.target.value
      setNewProduct({...newProduct, dataSheet: [...values]})
    }else if  (e.target.name === "optionValue"){
      values[index][e.target.name]=e.target.value
      setNewProduct({...newProduct, dataSheet: [...values]})
    }else if (e.target.name === "photoOne"){
      
      setNewProduct({...newProduct, photos: [...newProduct.photos, {photoOne: e.target.files[0]}]})
    }else if (e.target.name === "photoTwo"){
      setNewProduct({...newProduct, photos: [...newProduct.photos, {photoTwo: e.target.files[0]}]})
    }else if (e.target.name === "photoThree"){
      setNewProduct({...newProduct, photos: [...newProduct.photos, {photoThree: e.target.files[0]}]})

    }else {
      setNewProduct({...newProduct, [e.target.name]: e.target.value})
    }
      
  }

  const newInput = () =>{
    setInputFields([...inputFields, {optionName: "", optionValue: ""}])
  }

  const removeInput = (index) =>{
    const input = [...inputFields]
    input.splice(index, 1)
    setInputFields(input)
  }

  const deleteProduct = (id) => {
      props.deleteProductById(id)
      .then(response=>{console.log(response)
        if(!response.success){
            console.log("Hubo un error") //poner tostada
        }else {
          setProducts(products.filter(product => product._id !== id))
          setProductsFilt(productsFilt.filter(product => product._id !== id))
          console.log("Se borró con éxito") //poner tostada
        }
      })
  }




  const addProductHandler = async () => {
    const FD = new FormData()
    FD.append("name", newProduct.name)
    FD.append("stock", newProduct.stock)
    FD.append("price", newProduct.price)
    FD.append("color", newProduct.color)
    FD.append("photos", newProduct.photos[0].photoOne)
    FD.append("photos", newProduct.photos[1].photoTwo)
    FD.append("photos", newProduct.photos[2].photoThree)
    newProduct.dataSheet.map((data, index)=>{
      return FD.append("dataSheet", [data.optionName, data.optionValue])
    })
    FD.append("description", newProduct.description)
    FD.append("discount", newProduct.discount)
    FD.append("category", newProduct.category)
    FD.append("brand", newProduct.brand)
   let response = await props.addProduct(FD)
   if (!response.success) {
     console.log("Error") //Poner tostada
   }else {
     console.log("Se creó el producto correctamente") //Poner tostada
     props.getAllProducts()
     .then(response=>{
      setProducts(response)
      setProductsFilt(response)
     })
   }
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
                    <input type="file" name="photoOne" onChange={(e)=>newProductHandler("index", e)} />
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
                    <input type="file" name="photoTwo" onChange={(e)=>newProductHandler("index", e)}  />
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
                    <input type="file" name="photoThree" onChange={(e)=>newProductHandler("index", e)}  />
                  </div>
                </div>
              </div>
              <div className={styles.containerAllInputs}>
                <div className={styles.containerInputs}>
                  <label htmlFor="name">Nombre</label>
                  <input id="name" type="text" name="name" onChange={(e)=>newProductHandler("index", e)} />
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="color">Categoria</label>
                  <select className={styles.select} name="category" onChange={(e)=>newProductHandler("index", e)}>
                    {categories.map(category=> (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p onClick={newInput} style={{cursor: "pointer"}}>+ Agregar input</p>
                  {inputFields.map((input, index)=>{
                   return <div key={index}>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionName">Carácterística</label>
                        <input id="optionName" type="text" name="optionName" onChange={(e)=>newProductHandler(index, e)} defaultValue={input.optionName}/>
                      </div>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionValue">Descripción de car.</label>
                        <input id="optionValue" type="text" name="optionValue" onChange={(e)=>newProductHandler(index, e)} defaultValue={input.optionValue}/>
                      </div>
                      <p onClick={()=>removeInput(index)} style={{cursor: "pointer"}}>- Borrar input</p>
                  </div>
                  
                  })}
                  
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    onChange={(e)=>newProductHandler("index", e)}
                    id="description"
                    name="description"
                    resize="none"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="price">Precio</label>
                  <input id="price" type="number" name="price" onChange={(e)=>newProductHandler("index", e)} />
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="discount">Descuento</label>
                  <input id="discount" type="number" name="discount" onChange={(e)=>newProductHandler("index", e)}/>
                </div>
                <div className={styles.containerInputs}>
                <label htmlFor="brand">Marca</label>
                  <select id="brand" className={styles.select} name="brand" onChange={(e)=>newProductHandler("index", e)}>
                    {brands.map(brand=> (
                      <option
                        key={brand._id}
                        value={brand._id}
                      >
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="stock">Stock</label>
                  <input id="stock" type="number" name="stock" onChange={(e)=>newProductHandler("index", e)}/>
                </div>
                <div className={styles.containerInputs}>
                  <label htmlFor="color">Color</label>
                  <input id="color" type="text" name="color" onChange={(e)=>newProductHandler("index", e)}/>
                </div>
                <div className={styles.containerInputs}>
                  <button onClick={addProductHandler}>Enviar</button>
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
                <input id="search" type="text"  onChange={handle}/>
              </div>
              <div className={styles.containerProducts}>
                {productsFilt.map((product) => (
                  <div className={styles.boxProduct} >
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
                          onClick={()=>deleteProduct(product._id)}
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/C51Bv5HN/borrar.png')",
                          }}
                        ></div>
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
                {products.map((product, index) => (
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
                          onClick={()=>deleteProduct(product._id)}
                          className={styles.icon}
                          style={{
                            backgroundImage:
                              "url('https://i.postimg.cc/C51Bv5HN/borrar.png')",
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={styles.containerInfo}>
                     
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



const mapDispatchToProps = {
  addProduct: productsActions.addProduct,
  getCategories: productsActions.categories,
  getBrands: productsActions.brands,
  getAllProducts: productsActions.products,
  deleteProductById: productsActions.deleteProduct,
}

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    brands: state.products.brands,
    products: state.products.products,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
