import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./components/SignIn"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} />
        <Route path="/productos" component={Products}/>
        {/* <Route path="/notFound" component={NotFound} />*/}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
