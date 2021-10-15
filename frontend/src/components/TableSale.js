import React from "react";
import styles from "../styles/tableSale.module.css";

const TableSale = (props) => {
    return(
        <table className={styles.tableTotal}>
            <tbody>
                <tr>
                    <th >Productos</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                </tr>
                {props.shopCart.map((item, index)=>{
                    return(
                        <tr key={item.productId._id + props.saleId}>
                            <td> <img className={styles.imgProduct} src={`https://luxxor.herokuapp.com/productsPhoto/${item.productId.photos[0]}`}/> </td>
                            <td><h3> {item.productId.name}</h3></td>
                            <td ><h3>{item.quantity} </h3></td>
                        </tr>
                    )
                    })
                }
                <tr>
                    <td  colSpan="2"><p className={styles.td}> Total:</p></td>
                    <td ><h3 className={styles.td}>$ {(props.amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3></td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableSale