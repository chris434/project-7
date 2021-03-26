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
import NavBar from "./components/navbar";
import PostViewer from "./components/post-viewer";
import axios from "./components/axios";
import Axios from "axios";
import Cookies from "universal-cookie";
import CreatePost from "./components/create-post";

function App() {
  let endpoint = false;

  function SecureRoute(props) {
    const [isLoggedIN, setLogin] = useState(true);
    const [info, setData] = useState([]);
    useEffect(() => {
      let sauce = Axios.CancelToken.source();
      console.log(true);
      const getUser = async () => {
        console.log("kobbb");
        try {
          const cookie = new Cookies();
          console.log(cookie.get("Authorization"));
          const response = await axios.get(`/backend/authenticate`, {
            cancelToken: sauce.token,
            headers: {
              Authorization: cookie.get("Authorization"),
            },
          });
          console.log(response.data);
          console.log("k");

          setData(response.data);
          setLogin(true);
        } catch (e) {
          console.log("lim");
          setLogin(false);
          console.log(e);
        }
      };
      getUser();
      return () => {};
    }, []);
    return (
      <Route
        exact
        path={props.path}
        render={(data) => {
          endpoint = props.endpoint || false;
          console.log(endpoint);
          if (props.computedMatch.params.id) {
            endpoint = `${props.endpoint}/${props.computedMatch.params.id}`;
          }
          console.log("jnnn");

          if (isLoggedIN === true) {
            console.log(info);
            return (
              <div>
                <NavBar {...info}></NavBar>
                <main>
                  <props.component></props.component>
                </main>
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
            endpoint={"/posts"}
            path={"/forum"}
            component={Forum}></SecureRoute>
          <SecureRoute
            exact
            endpoint={"/post"}
            path={"/post/:id"}
            component={PostViewer}></SecureRoute>
          <SecureRoute
            endpoint={"/authenticate"}
            path={"/createpost"}
            component={CreatePost}></SecureRoute>
          <SecureRoute
            endpoint={"/authenticate"}
            path={"/post/:id"}
            component={CreatePost}></SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
