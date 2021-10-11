import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"
import Category from "./components/Category"
import Brand from "./components/Brand"
import Admin from "./pages/Admin"
import { useEffect } from "react"
import usersAction from "./redux/actions/usersAction"
import Error from "./pages/Error"
import EditProfile from "./pages/EditProfile"
import { connect } from "react-redux"
import Password from "./pages/Password";
import ChangePassword from "./pages/ChangePassword";
import Banned from "./pages/Banned";
import Product2  from "./pages/Product2"
import Sale from "./pages/Sale";
import AdminMessages from "./pages/AdminMessages"
import shopCartActions from "./redux/actions/shopCartActions"

const App = (props) => {
  const {token, dni, signWithLocal} = props
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
        {!props.token && <Route path="/registro" component={SignUp} />}
        <Route exact path="/" render={ () => <Home scrollTo={"#"} />} />
        <Route path="/contacto" render={ () => <Home scrollTo={"#contacto"} /> } />
        <Route path="/novedades" render={ () => <Home scrollTo={"#novedades"} /> } />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto/:id" component={Product2} /> 
        <Route path="/productos" component={Products} />
        <Route exact path="/admin/messages" component={AdminMessages} />
        <Route path="/admin/categorias" component={Category} />
        <Route path="/admin/marcas" component={Brand} />
        <Route path="/admin" component={Admin} />
        <Route path="/error" component={Error} />
        <Route path="/bloqueo-cuenta/:id" component={Banned}/>
        <Route path="/cambio-contrasenia/:id" component={ChangePassword}/>
        <Route path="/checkout" component={Sale}/>        
       {/*  {!props.token && <Route path="/password" component={Password}/>}  */}
        {(token && !dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={false} /> } />}
        {(token && dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={true} /> } />}
        <Redirect to="/error" />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
