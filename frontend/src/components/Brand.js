import {
  CheckCircle,
  XCircle,
  ClockFill,
  Pen,
  PlusCircle,
} from "react-bootstrap-icons";
import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin";
import productsActions from "../redux/actions/productsActions";
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
        console.log(e);
      } finally {
        setLoading(!loading);
      }
    };
    getBrands();
  }, []);

  const sendBrand = async () => {
    if (!brand) {
      alert("No puede estar vacio");
    } else {
      let res = await props.addBrand(brand, props.token);
      if (!res.data.success) {
        alert(res.data.response);
      } else {
        alert("Creado con éxito");
        let resp = await props.getBrands();
        setBrands(resp);
      }
    }
  };

  const editBrand = async (id) => {
    let res = await props.editBrand(id, { name: brand }, props.token);
    let resp = await props.getBrands();
    setBrands(resp);
  };
  const deleteBrand = async (id, index) => {
    let res = await props.deleteBrand(id, props.token);
    console.log(res);
    res.data.success && alert("Borrado con éxito");
    setBrands(brands.splice(id, index));
  };
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
