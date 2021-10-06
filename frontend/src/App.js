import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Product from "./components/Product"
import Products from "./pages/Products"
import Admin from "./Admin/Admin"
import CompleteProfile from "./components/CompleteProfile"


const App = () => {
  return (    
    <BrowserRouter>
      <CompleteProfile/>
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        <Route path="/producto" component={Product} /> 
        <Route path="/productos" component={Products}/>
        <Route path="/admin" component={Admin} />  */}
        {/* <Route path="/notFound" component={NotFound} /> */}
        {/* <Redirect to="/" />
      </Switch> */}
    </BrowserRouter>
  )
}

export default App
