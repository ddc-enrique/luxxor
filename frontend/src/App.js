import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Admin from "./Admin/Admin"

const App = () => {
  return (
    <BrowserRouter>
      <Admin/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registro" component={SignUp} />
        {/* <Route path="/notFound" component={NotFound} />*/}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
