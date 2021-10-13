import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/userPurchase.module.css"
import { Link } from "react-router-dom"
import moment from "moment"
import TableSale from "./TableSale"

const UserPurchase = (props) => {
    const [myProducts, setMyProducts] = useState()
    const [error, setError] = useState("")

    useEffect(()=> {
       
       const myShops = async () => {
       let response = await props.myShopping(props.userId)
        if(!response.success) setError(response.response)
        setMyProducts(response)
        
       }
       myShops()
    }, [])
    let myShopping = []
    let sales = []
    let allProducts = []
    if (myProducts && !error){
        myShopping = myProducts.map(product=> product.shopCart)
        myShopping.map(shop => shop.forEach(shop => sales.push(shop)))
        allProducts = myProducts.concat(sales)
    }


    return (
        <>
            {!props.view && 
            <>
            <h2 className={styles.title}>Historial de compras</h2>
            <nav className={styles.navegator}>
                <Link  to="#">Mis compras</Link> 
                <Link onClick={()=>props.setView(true)} to="#">Mis datos</Link>
            </nav>
            </>
            }
            <div className={!props.view ? styles.divContainer : styles.none}>

                {error ? <div>
                    <div>
                        <h1>No tienes compras realizadas</h1>
                        <h2>Puedes comenzar a comprar haciendo click <Link to="/productos">AQUÍ</Link></h2>
                    </div>
                    <div className={styles.photoShop} style={{backgroundImage: `url(${"https://i.postimg.cc/MKvCYWqL/prod.png"})`, width: "30rem", height: "30rem"}}></div>
                </div>
                : <div className={styles.productsContainer}>
                    {myProducts && myProducts.map(product => {
                        return (    
                            <div className={styles.container}>
                                <h2>Orden: #{product.numberOrder}</h2>
                                <p>Fecha: {moment(product.date).format("DD/MM/YYYY")}</p>
                                            <TableSale shopCart={product.shopCart} amount={product.amount}/>
                            </div>
                        )
                    })}
                </div>}
                
            </div>
        </>
    )
}

const mapStateToProps = state =>{
    return {
        userId: state.users.id
    }
}

const mapDispatchToProps = {
    myShopping: productsActions.productsByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPurchase)