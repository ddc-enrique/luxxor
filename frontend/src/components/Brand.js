import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import styles from "../styles/category.module.css";
import { NavAdmin } from "./NavAdmin";
import productsActions from "../redux/actions/productsActions";
import { connect } from "react-redux";
const Brand = (props) => {
const [brands, setBrands] = useState([])
const [loading, setLoading] = useState(true)
const [editOpen, setEditOpen] = useState('')
const [brand, setBrand] = useState('')
useEffect(() => {
    const getBrands = async () => {
        try {
            let res = await props.getBrands()
            setBrands(res)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(!loading)
        }
    }
    getBrands()
    }, [])

   const sendBrand = async () => {
     if(!brand) {
      alert("No puede estar vacio") 
     } else {
      let res = await props.addBrand(brand)
      if(!res.data.success) {
        alert(res.data.response)
      } else {
        alert('Creado con éxito')
        let resp = await props.getBrands()
        setBrands(resp)
      }
     }
    }
    // console.log(brand)
    const editBrand = async (id) => {
      console.log(brand, id)
      let res = await props.editBrand(brand,id)
      console.log(res)
    }
    const deleteBrand = async (id,index) => {
      let res = await props.deleteBrand(id)
      console.log(res)
      res.data.success && alert("Borrado con éxito")
       setBrands(brands.splice(id,index))
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
        <NavAdmin />
        <div className={styles.sectionBrandCategory}>
          <div className={styles.containerCategory}>
            <h2>Marcas</h2>
            {loading ? <div className={styles.loading}></div> : !brands ? <h1>No hay Marcas cargadas</h1> :
                brands.map((brand,index) => (
                <div key={index} className={styles.category}> 
              <h3>{editOpen === brand.name ? (<><textarea
            name="name" onChange={(e) =>setBrand(e.target.value)}
          >{brand.name}</textarea> <button onClick={()=> editBrand(brand._id)}>Enviar</button>  <button onClick={()=> setEditOpen(!editOpen)}>Cancelar</button> </>): brand.name }</h3>
              <div className={styles.cointanerEdit}>
                <div
                  onClick={() => setEditOpen(brand.name)}
                  className={styles.icon}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/bN0rQQhh/editar.png')"
                  }}
                ></div>
                <div
                  onClick={() => deleteBrand(brand._id,index)}
                  className={styles.icon}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/C51Bv5HN/borrar.png')",
                  }}
                ></div>
              </div>
            </div>
            )) }
          </div>
          <div className={styles.containerForm}>
            <div>
              <div
                className={styles.icon}
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/h47DcVZB/search.png')",
                }}
              ></div>
              <h3>Cargar nueva Marca</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" name="name" onChange={(e) => setBrand({name:e.target.value})}/>
              </div>
            </div>
            <div className={styles.containerButton}>
              <button onClick={()=> sendBrand()}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      allBrands: state.products.brands,
    }
}

  const mapDispatchToProps = {
    getBrands: productsActions.brands,
    editBrand: productsActions.brands,
    addBrand: productsActions.addBrand,
    deleteBrand: productsActions.editBrand
  }
export default connect(mapStateToProps,mapDispatchToProps)(Brand)