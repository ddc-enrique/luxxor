import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
export const NavAdmin = () => {
  return (
    <div className={styles.containerNav}>
      <nav className={styles.navAdmin}>
        <Link to="/admin">
          <div
            className={styles.icon}
            style={{
              backgroundImage: "url('https://i.postimg.cc/CLBqjvWy/home.png')",
            }}
          ></div>
          <span>Home</span>
        </Link>
        <Link to="/admin/marcas">
          <div
            className={styles.icon}
            style={{
              backgroundImage: "url('https://i.postimg.cc/pLTnvRr7/brand.png)",
            }}
          ></div>
          <span>Marcas</span>
        </Link>
        <Link to="/admin/categorias">
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
  );
};
