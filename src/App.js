import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home";
import SignUP from "./components/signup";
import Forum from "./components/forum";
import { axios } from "./components/axios";
import Cookies from "universal-cookie";

function App() {
  async function checkLogin() {
    try {
      const cookie = new Cookies();
      console.log("j");
      const response = await axios.get(`/backend/forum`, {
        headers: {
          Authorization: cookie.get("Authorization"),
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log("jk");
        return { data: response.data, status: true };
      } else {
        return false;
      }
    } catch {}
  }

  function SecureRoute(props) {
    const [isLoggedIN, setLogin] = useState({ status: false });
    const [info, setData] = useState();
    useEffect(() => {
      checkLogin().then((res) => {
        setData(res.data);
        setLogin(res.status);
      });
    }, [isLoggedIN]);

    return (
      <Route
        path={props.path}
        render={(data) => {
          console.log(info);
          if (isLoggedIN) {
            return <props.component {...info}></props.component>;
          } else {
            return <Redirect to={{ pathname: "/" }}></Redirect>;
          }
        }}></Route>
    );
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/signup"} component={SignUP} />
          <SecureRoute path={"/forum"} component={Forum}></SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
