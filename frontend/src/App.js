import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"
import Admin from "./pages/Admin"
import { useEffect } from "react"
import usersAction from "./redux/actions/usersAction"
import Error from "./pages/Error"
import EditProfile from "./pages/EditProfile"
import { connect } from "react-redux"


const App = (props) => {

  useEffect(() => {
    if (localStorage.getItem("token")){
      props.signWithLocal(localStorage.getItem("token"))
    }
  }, [])

  return (    
    <BrowserRouter>
      <EditProfile completeAccount={false} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} /> 
        <Route path="/productos" component={Products} />
        <Route path="/admin" component={Admin} />
        <Route path="/error" component={Error} />
        {(props.token && !props.dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={false} /> } />}
        {(props.token && props.dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={true} /> } />}
        {/* <Route path="/notFound" component={NotFound} /> */}
        <Redirect to="/error" />
      </Switch>
    </BrowserRouter>
  )
}

const mapDispatchToProps = {
  signWithLocal: usersAction.signWithLocal
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    dni: state.users.dni,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
