import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import styles from "../styles/category.module.css";
import { NavAdmin } from "./NavAdmin";
import productsActions from "../redux/actions/productsActions";
import { connect } from "react-redux";
const Category = (props) => {
const [categories, setCategories] = useState(props.categories)
const [loading, setLoading] = useState(true)
const [category, setCategory] = useState('')
useEffect(() => {
    const getCategories = async () => {
        try {
            let res = await props.getCategories()
        setCategories(res)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(!loading)
        }
    }
        getCategories()
    }, [])
    const sendCategory = async () => {
      if(!category) {
       alert("No puede estar vacio") 
      } else {
       let res = await props.addCategory(category)
       if(!res.data.success) {
         alert(res.data.response)
       } else {
         alert('Creado con éxito')
         let response = await props.getCategories()
         setCategories(response)
       }
      }
     }
     const deleteCategory = async (id,index) => {
       let res = await props.deleteCategory(id)
       console.log(res)
       res.data.success && alert("Borrado con éxito")
        setCategories(categories.splice(id,index))
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
            <h2>Categorias</h2>
            {loading ? <div className={styles.loading}></div> : !categories ? <h1>No hay categorías cargadas</h1> :
                categories.map((category,index) => (
                <div key={index} className={styles.category}>
              <h3>{category.name}</h3>
              <div className={styles.cointanerEdit}>
                <div
                  onClick={() => alert("edit")}
                  className={styles.icon}
                  style={{
                    backgroundImage:
                      "url('https://i.postimg.cc/bN0rQQhh/editar.png')"
                  }}
                ></div>
                <div
                  onClick={() => deleteCategory(category._id,index)}
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
              <h3>Cargar Nueva Categoria</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="name">Nombre</label>
                <input id="name" type="text" name="name" onChange={(e) => setCategory({name:e.target.value})}/>
              </div>
            </div>
            <div className={styles.containerButton}>
              <button onClick={()=> sendCategory()}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      allcategories: state.products.categories,
    }
}

  const mapDispatchToProps = {
    getCategories: productsActions.categories,
    addCategory: productsActions.addCategory,
    deleteCategory: productsActions.deleteCategory
  }
export default connect(mapStateToProps,mapDispatchToProps)(Category)