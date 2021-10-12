import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/userPurchase.module.css"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const UserPurchase = (props) => {
    //https://i.postimg.cc/ZRKk8wv4/nh-2-removebg-preview-1.png
    const [myProducts, setMyProducts] = useState()

    const [error, setError] = useState("")

    useEffect(()=> {
       
       const myShops = async () => {
       let response = await props.myShopping(props.userId)
       console.log(response)
        if(!response.success) setError(response.response)
            
       }
       myShops()
    }, [])


    return (
        <div>
            <div className={!props.view ? styles.divContainer : styles.none}>
                        <Link  to="#">Mis compras</Link> 
                        <Link onClick={()=>props.setView(true)} to="#">Mis datos</Link>
                <div style={{backgroundImage: `url(${"https://i.postimg.cc/ZRKk8wv4/nh-2-removebg-preview-1.png"})`}}></div>
                <div>

                </div>
            </div>
        </div>
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