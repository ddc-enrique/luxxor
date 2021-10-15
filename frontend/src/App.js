import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Products from "./pages/Products"
import Category from "./components/Category"
import Brand from "./components/Brand"
import Admin from "./pages/Admin"
import { useEffect } from "react"
import usersAction from "./redux/actions/usersAction"
import EditProfile from "./pages/EditProfile"
import { connect } from "react-redux"
import ChangePassword from "./pages/ChangePassword"
import Banned from "./pages/Banned"
import Product2  from "./pages/Product2"
import Sale from "./pages/Sale"
import AdminMessages from "./pages/AdminMessages"
import shopCartActions from "./redux/actions/shopCartActions"
import AdminSales from "./components/AdminSales"

const App = (props) => {
  const {token, dni, signWithLocal, total, admin} = props
  useEffect(() => {
    if (localStorage.getItem("token")){
      signWithLocal(localStorage.getItem("token"))
    }
    if(localStorage.getItem('shopCart') && localStorage.getItem('subtotal') && localStorage.getItem('subtotal')){
      props.loadShopInLs(localStorage.getItem('shopCart'),localStorage.getItem('subtotal'),localStorage.getItem('total'))
    }
  }, [])

  return (    
    <BrowserRouter>
      <Switch>
        {!token && <Route path="/registro" component={SignUp} />}
        <Route exact path="/" render={ () => <Home scrollTo={"#"} />} />
        <Route path="/contacto" render={ () => <Home scrollTo={"#contacto"} /> } />
        <Route path="/novedades" render={ () => <Home scrollTo={"#novedades"} /> } />
        <Route path="/producto/:id" component={Product2} /> 
        <Route path="/productos" component={Products} />
        {admin && <Route exact path="/admin/messages" component={AdminMessages} />}
        {admin && <Route path="/admin/categorias" component={Category} />}
        {admin && <Route path="/admin/marcas" component={Brand} />}
        {admin && <Route path="/admin/ventas" component={AdminSales}/>  }
        {admin && <Route path="/admin" component={Admin} />}
        {!token && <Route path="/bloqueo-cuenta/:id" component={Banned}/>}
        {!token && <Route path="/cambio-contrasenia/:id" component={ChangePassword}/>}
        <Route path="/checkout" component={Sale}/>
        {(token && !dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={false} /> } />}
        {(token && dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={true} /> } />}
        
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapDispatchToProps = {
  signWithLocal: usersAction.signWithLocal,
  loadShopInLs:shopCartActions.loadShopInLs
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    dni: state.users.dni,
    total: state.shopCart.shopCart,
    admin: state.users.admin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
