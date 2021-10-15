import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import productsActions from "../redux/actions/productsActions";
import { NavAdmin } from "../components/NavAdmin";
import EditProduct from "../components/EditProduct";
import {
    PlusCircle,
    DashCircle, 
    Search, 
    CheckCircle,
    XCircle, 
    ClockFill, 
    Pen} from 'react-bootstrap-icons'
import toast from "react-hot-toast";
const Admin = (props) => {

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
  const [productsFiltered, setProductsFiltered] = useState(JSON.parse(JSON.stringify(props.products)))
  const [productId, setProductId] = useState(null)
  const [modalEdit, setModalEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    
    const getAllProducts = async () => {
      if(!products.length){
        let response = await props.getAllProducts()
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
    setLoading(false)
  }, [])

 
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
      props.deleteProductById(id, props.token)
      .then(response=>{
        if(!response.success){
            toast.error("No se pudo borrar el producto")
        }else {
          setProducts(products.filter(product => product._id !== id))
          setProductsFilt(productsFilt.filter(product => product._id !== id))
          toast.success("Se borró con éxito")
        }
      })
  }
  
const EditProductComp = (props) => {
    props.setModalEdit(true) 
    return (modalEdit && <EditProduct  setModalEdit={props.setModalEdit} id={props.productId} brands={brands} categories={categories}/>)
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
   let response = await props.addProduct(FD, props.token)
   if (!response.success) {
    toast.error("No se pudo cargar el producto")    
   }else {
     toast.success("Se creó el producto correctamente")
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
        <NavAdmin/>
        <div className={styles.containerSections}>
          <section className={styles.addNew}>
            <div>
            <PlusCircle className={styles.icon}/>
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
                      backgroundImage: !newProduct.photos[0] ?
                        "url('https://i.postimg.cc/Y9rFYtw8/add.png')" : "url('https://i.postimg.cc/1tcp7bhy/image-removebg-preview.png')",
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
                      backgroundImage:!newProduct.photos[1] ?
                      "url('https://i.postimg.cc/Y9rFYtw8/add.png')" : "url('https://i.postimg.cc/1tcp7bhy/image-removebg-preview.png')",
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
                      backgroundImage:!newProduct.photos[2] ?
                      "url('https://i.postimg.cc/Y9rFYtw8/add.png')" : "url('https://i.postimg.cc/1tcp7bhy/image-removebg-preview.png')",
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
                  <label htmlFor="category">Categoria</label>
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
                <PlusCircle className={styles.icon} onClick={newInput} style={{cursor: "pointer"}}/>
                  {inputFields.map((input, index)=>{
                   return <div key={index} className={styles.addCaracter}>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionName">Carácterística</label>
                        <input id="optionName" type="text" name="optionName" onChange={(e)=>newProductHandler(index, e)} defaultValue={input.optionName}/>
                      </div>
                      <div className={styles.containerInputs}>
                        <label htmlFor="optionValue">Descripción de car.</label>
                        <input id="optionValue" type="text" name="optionValue" onChange={(e)=>newProductHandler(index, e)} defaultValue={input.optionValue}/>
                      </div>
                      <DashCircle className={styles.icon} onClick={()=>removeInput(index)} style={{cursor: "pointer"}}/>
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
            <Search className={styles.icon}/>
              <h3>Buscar</h3>
            </div>
            
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="search">Buscar Producto</label>
                <input id="search" type="text"  onChange={handle}/>
              </div>
              <div className={styles.containerProducts}>
                {loading ? <div className={styles.loading}></div> : 
                !productsFilt.length && <p>No hay resultados para tu búsqueda</p> ||
                  productsFilt.map((product) => (
                  <div className={styles.boxProduct} key={product._id} >
                    <div className={styles.titleProduct}>
                      <div
                        className={styles.imageProduct}
                        style={{backgroundImage: `url("http://localhost:4000/productsPhoto/${product.photos[0]}")`}}
                      ></div>
                      <h3>{product.name}</h3>
                      <div className={styles.cointanerEdit}>
                         <Pen className={styles.icon} style={{cursor: "pointer"}}  onClick={()=>{setProductId(product._id); setModalEdit(!modalEdit)}}/>
                         <XCircle className={styles.icon} onClick={()=>deleteProduct(product._id)} style={{cursor: "pointer"}}/>
                      </div>
                    </div>

                  </div>
                ))}
                {modalEdit && <EditProductComp  productId={productId} setModalEdit={setModalEdit}/>}
              </div>
            </div>
          </section>
          <section className={styles.lastAdded}>
            <div>
            <ClockFill className={styles.icon} style={{cursor: "pointer"}}/>
              <h3>Agregados Recientemente</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerProducts}>
                {loading ? <div className={styles.loading}></div> :
                  productsFiltered.slice(0,4).reverse().map((product, index) => (
                  <div className={styles.boxProduct} key={product._id}>
                    <div className={styles.titleProduct}>
                      <div
                        className={styles.imageProduct}
                        style={{backgroundImage: `url("http://localhost:4000/productsPhoto/${product.photos[0]}")`}}
                      ></div>
                      <h3>{product.name}</h3>
                      <div className={styles.cointanerEdit}>
                      <Pen className={styles.icon} style={{cursor: "pointer"}}  onClick={()=>{setProductId(product._id); setModalEdit(!modalEdit)}}/>
                        <XCircle className={styles.icon} onClick={()=>deleteProduct(product._id)} style={{cursor: "pointer"}}/>
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
    token: state.users.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
