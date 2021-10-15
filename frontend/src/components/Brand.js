import {
  CheckCircle,
  XCircle,
  Pen,
} from "react-bootstrap-icons";
import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin";
import productsActions from "../redux/actions/productsActions";
import toast, { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
const Brand = (props) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState("");
  const [brand, setBrand] = useState("");
  useEffect(() => {
    const getBrands = async () => {
      try {
        let res = await props.getBrands();
        setBrands(res);
      } catch (e) {
        notificationToast(
          "Hubo un problema, intente nuevamente más tarde",
          "🚫"
        );
      } finally {
        setLoading(!loading);
      }
    };
    getBrands();
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
  const sendBrand = async () => {
    if (!brand) {
      notificationToast("El campo no puede estar vacio", "🚫");
    } else {
      let res = await props.addBrand(brand, props.token);
      if (!res.data.success) {
        notificationToast(res.data.response, "🚫");
      } else {
        notificationToast("Creado con éxito", "👏");
        let resp = await props.getBrands();
        setBrands(resp);
      }
    }
  };

  const editBrand = async (id) => {
    if (!brand) {
      notificationToast("El campo no puede estar vacio", "🚫");
    } else {
      try {
        let res = await props.editBrand(id, { name: brand }, props.token);
        if (res.data.success) {
          notificationToast("Modificado con éxito", "👏");
          let resp = await props.getBrands();
          setBrands(resp);
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
  const deleteBrand = async (id, index) => {
    try {
      let res = await props.deleteBrand(id, props.token);
      res.data.success && notificationToast("Borrado con éxito", "👏");
      setBrands(brands.filter(brand => brand._id !== id));
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
            <h2>Marcas</h2>
            {loading ? (
              <div className={styles.loading}></div>
            ) : !brands ? (
              <h1>No hay Marcas cargadas</h1>
            ) : (
              brands.map((brand, index) => (
                <div key={index} className={styles.category}>
                  <h3>
                    {editOpen === brand.name ? (
                      <>
                        <textarea
                          name="name"
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          {brand.name}
                        </textarea>
                        <CheckCircle
                          className={styles.icon}
                          onClick={() => editBrand(brand._id)}
                        />
                        <XCircle
                          className={styles.icon}
                          onClick={() => setEditOpen(!editOpen)}
                        />
                      </>
                    ) : (
                      brand.name
                    )}
                  </h3>
                  <div className={styles.cointanerEdit}>
                    <Pen
                      className={styles.icon}
                      onClick={() => setEditOpen(brand.name)}
                    />
                    <XCircle
                      className={styles.icon}
                      onClick={() => deleteBrand(brand._id, index)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.containerForm}>
            <div>
              <h3>Cargar nueva Marca</h3>
            </div>
            <div className={styles.containerAllInputs}>
              <div className={styles.containerInputs}>
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => setBrand({ name: e.target.value })}
                />
                <button onClick={() => sendBrand()}>Enviar</button>
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
    allBrands: state.products.brands,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  getBrands: productsActions.brands,
  editBrand: productsActions.editBrand,
  addBrand: productsActions.addBrand,
  deleteBrand: productsActions.deleteBrand,
};
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
