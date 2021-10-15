import React from "react";
import styles from "../styles/admin.module.css";
import { Link } from "react-router-dom";
import { ColumnsGap, Bag, Tag,ChatDots, CartCheck} from 'react-bootstrap-icons'
export const NavAdmin = () => {
  return (
    <div className={styles.containerNav}>
      <nav className={styles.navAdmin}>
      <Link to="/admin">
        <Bag className={styles.icon}/>
          <span>Productos</span>
        </Link>
        <Link to="/admin/ventas">
          <CartCheck className={styles.icon}/>
          <span>Ventas</span>
        </Link>
        <Link to="/admin/marcas">
        <Tag className={styles.icon}/>
          <span>Marcas</span>
        </Link>
        <Link to="/admin/categorias">
        <ColumnsGap className={styles.icon}/>
          <span>Categorias</span>
        </Link>
        <Link to="/admin/messages">
        <ChatDots className={styles.icon}/>
          <span>Mensajes</span>
        </Link>
      </nav>
    </div>
  );
};
