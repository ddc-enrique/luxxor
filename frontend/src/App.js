import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./components/SignIn"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Admin from "./Admin/Admin"


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} /> 
        <Route path="/admin" component={Admin} /> 
        {/* <Route path="/notFound" component={NotFound} /> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
