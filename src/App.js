import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "./components/header";
import Home from "./components/home";
import SignUP from "./components/signup";
import Forum from "./components/forum";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/signup"} component={SignUP} />
          <Route exact path={"/forum"} component={Forum}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
