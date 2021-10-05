import "./App.css"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
    {/* <Home /> */}
    <SignUp/>
      <Switch>
        <Route />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/notFound" component={NotFound} />*/}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
