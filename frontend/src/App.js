import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"
import Admin from "./Admin/Admin"
import EditProfile from "./pages/EditProfile"
import { connect } from "react-redux"


const App = ({ token, dni}) => {
  return (    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} /> 
        <Route path="/productos" component={Products} />
        <Route path="/admin" component={Admin} />
        {(token && !dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={false} /> } />}
        {(token && dni) && <Route path="/mi-cuenta" render={ () => <EditProfile completeAccount={true} /> } />}
        {/* <Route path="/notFound" component={NotFound} /> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    dni: state.users.dni,
  }
}

export default connect(mapStateToProps)(App)