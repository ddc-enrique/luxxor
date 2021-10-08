import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"
import Admin from "./Admin/Admin"
import Error from "./pages/Error"
// import CompleteProfile from "./components/CompleteProfile"


const App = () => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} /> 
        <Route path="/productos" component={Products}/>
        <Route path="/admin" component={Admin} /> 
        <Route path="/error" component={Error} />
        {/* <Route path="/actualizar-datos" component={CompleteProfile} /> */}
        <Redirect to="/error" />
      </Switch> 
    </BrowserRouter>
  )
}

export default App
