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
import axios from "./components/axios";
import Cookies from "universal-cookie";
import CreatePost from "./components/create-post";

function App() {
  let endpoint;
  async function checkLogin() {
    try {
      const cookie = new Cookies();

      const response = await axios.get(`/backend/${endpoint}`, {
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
    console.log(props);
    const [isLoggedIN, setLogin] = useState({
      status: false,
    });
    console.log(isLoggedIN);
    const [info, setData] = useState();

    useEffect(() => {
      checkLogin().then((res) => {
        setData(res.data);
        setLogin(res.status);
      });
    }, [isLoggedIN]);

    return (
      <Route
        exact
        path={props.path}
        render={(data) => {
          endpoint = props.endpoint;

          if (isLoggedIN) {
            console.log(info);
            return (
              <div>
                <props.component {...info}></props.component>;
              </div>
            );
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
          <SecureRoute
            endpoint={"/forum"}
            path={"/forum"}
            component={Forum}></SecureRoute>

          <SecureRoute
            endpoint={"/authenticate"}
            path={"/createpost"}
            component={CreatePost}></SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
