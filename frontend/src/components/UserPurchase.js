import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/userPurchase.module.css"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const UserPurchase = (props) => {
    console.log(props)
    //https://i.postimg.cc/ZRKk8wv4/nh-2-removebg-preview-1.png
    const [myProducts, setMyProducts] = useState()
    const [myShoppingDetails, setMyShoppingDetails] = useState()
    const [error, setError] = useState("")

    useEffect(()=> {
       
       const myShops = async () => {
       let response = await props.myShopping(props.userId)
        if(!response.success) setError(response.response)
        setMyProducts(response)
        
       }
       myShops()
    }, [])
    console.log()
    let myShopping = []
    let sales = []

    if (myProducts && !error){
        myShopping = myProducts.map(product=> product.shopCart)
        myShopping.map(shop => shop.forEach(shop => sales.push(shop)))
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
                    {sales && sales.map(sale => {
                        return (
                            <div className={styles.container}>
                                <div className={styles.divImage} style={{backgroundImage: `url("http://localhost:4000/productsPhoto/${sale.productId.photos[0]}")`, height: "10rem", width: "10rem"}}>
                                </div>
                                <div>
                                    <p>{`${sale.quantity}  ${sale.productId.name}`}</p>
                                    {/* <p>{sale.quantity}</p> */}
                                </div>
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