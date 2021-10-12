import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"

const UserPurchase = (props) => {

    const [myProducts, setMyProducts] = useState()

    useEffect(()=> {
       
       const myShops = async () => {
       let response = await props.myShopping(props.match.params.id)
        if (response.data.success){
            setMyProducts(response)
        }
       }
        
    }, [])

    console.log(myProducts)

    return (
        <>

        </>
    )
}


const mapDispatchToProps = {
    myShopping: productsActions.productsByUser
}

export default connect(null, mapDispatchToProps)(UserPurchase)