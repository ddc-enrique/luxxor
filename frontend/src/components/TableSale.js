import React from "react";
import styles from "../styles/tableSale.module.css";

const TableSale = (props) => {
    return(
        <>
            <table className={styles.tableTotal}>
                            <tr>
                                <th >Productos</th>
                                <th>Nombre</th>  
                                <th>Cantidad</th>
                                                  
                            </tr>
                       {props.shopCart.map(item=>{
                              return ( <tr>
                                    {/* <td><div  style={{backgroundImage: `url("http://localhost:4000/productsPhoto/${item.productId.photos[0]}")`, height: "15rem", width: "15rem"}}></div></td> */}
                                    <td> <img className={styles.imgProduct} src={`http://localhost:4000/productsPhoto/${item.productId.photos[0]}`}/></td>
                                    <td><h3> {item.productId.name}</h3></td> 
                                    <td ><h3>{item.quantity} </h3></td>                                 
                                </tr>)

                            })
                        } 
                            <tr>
                                <td  colSpan="2"><h3 className={styles.td}> Total:</h3></td>
                                <td ><h3 className={styles.td}>$ {(props.amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3></td>   
                            </tr>
            </table>
        </>
    )
}

export default TableSale