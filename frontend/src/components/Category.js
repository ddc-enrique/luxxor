import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin";
import productsActions from "../redux/actions/productsActions";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { XCircle, Pen, CheckCircle } from "react-bootstrap-icons";
const Category = (props) => {
  const [categories, setCategories] = useState(props.categories);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [editOpen, setEditOpen] = useState("");
  useEffect(() => {
    const getCategories = async () => {
      try {
        let res = await props.getCategories();
        setCategories(res);
      } catch (e) {
        notificationToast(
          "Hubo un problema, intente nuevamente más tarde",
          "🚫"
        );
      } finally {
        setLoading(!loading);
      }
    };
    getCategories();
  }, []);
  const notificationToast = (message, icon) => {
    return toast(message, {
      icon: icon,
      style: {
        borderRadius: "1rem",
        background: "#fff",
        color: "#545454",
      },
    });
  };
  const sendCategory = async () => {
    if (!category) {
      notificationToast("El campo no puede estar vacio", "🚫");
    } else {
      let res = await props.addCategory(category, props.token);
      if (!res.data.success) {
        notificationToast(res.data.response, "🚫");
      } else {
        notificationToast("Creado con éxito", "👏");
        let response = await props.getCategories();
        setCategories(response);
      }
    }
  };
  const editCategory = async (id) => {
    if (!category) {
      notificationToast("El campo no puede estar vacio", "🚫");
    } else {
      try {
        let res = await props.editCategory(id, { name: category }, props.token);
        if (res.data.success) {
          notificationToast("Modificado con éxito", "👏");
          let resp = await props.getCategories();
          setCategories(resp);
        } else {
          throw new Error();
        }
      } catch (e) {
        notificationToast(
          "Hubo un problema, intente nuevamente más tarde",
          "🚫"
        );
      }
    }
  };
  const deleteCategory = async (id, index) => {
    try {
      let res = await props.deleteCategory(id, props.token);
      if (!res.data.success) throw new Error();
      res.data.success && notificationToast("Borrado con éxito", "👏");
      setCategories(categories.filter(category => category._id !== id));
    } catch (e) {
      notificationToast("Hubo un problema, intente nuevamente más tarde", "🚫");
    }
  };
  return (
    <div className={styles.divContainer}>
      <Toaster />
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
            {loading ? (
              <div className={styles.loading}></div>
            ) : !categories ? (
              <h1>No hay categorías cargadas. ¡Carga una!</h1>
            ) : (
              categories.map((category, index) => (
                <div key={index} className={styles.category}>
                  <h3>
                    {editOpen === category.name ? (
                      <>
                        <textarea
                          name="name"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {category.name}
                        </textarea>
                        <CheckCircle
                          className={styles.icon}
                          onClick={() => editCategory(category._id)}
                        />
                        <XCircle
                          className={styles.icon}
                          onClick={() => setEditOpen(!editOpen)}
                        />
                      </>
                    ) : (
                      category.name
                    )}
                  </h3>
                  <div className={styles.cointanerEdit}>
                    <Pen
                      className={styles.icon}
                      onClick={() => setEditOpen(category.name)}
                    />
                    <XCircle
                      className={styles.icon}
                      onClick={() => deleteCategory(category._id, index)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.containerForm}>
            <div>
              <h3>Cargar Nueva Categoria</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => setCategory({ name: e.target.value })}
                />
                <button onClick={() => sendCategory()}>Enviar</button>
              </div>
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
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  getCategories: productsActions.categories,
  addCategory: productsActions.addCategory,
  editCategory: productsActions.editCategory,
  deleteCategory: productsActions.deleteCategory,
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
