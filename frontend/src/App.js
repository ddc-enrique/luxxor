import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./components/SignIn"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
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
