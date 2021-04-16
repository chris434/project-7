import "./App.css";
import "./loading.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./components/context/userContext";
import Home from "./components/home";
import SignUP from "./components/signup";
import Forum from "./components/forum";
import NavBar from "./components/navbar";
import PostViewer from "./components/post-viewer";
import axios from "./components/axios";
import Axios from "axios";
import Cookies from "universal-cookie";
import CreatePost from "./components/create-post";
import Delete from "./components/delete";
import NoResult from "./components/404";

function App() {
  let endpoint = false;

  function SecureRoute(props) {
    const { pathname } = useLocation();
    const [info, setData] = useState([]);
    const [isLoggedIN, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      let sauce = Axios.CancelToken.source();
      console.log(true);
      const getUser = async () => {
        try {
          const cookie = new Cookies();
          console.log(cookie.get("Authorization"));
          const response = await axios.get(`/backend/authenticate`, {
            cancelToken: sauce.token,
            headers: {
              Authorization: cookie.get("Authorization"),
            },
          });
          setLoading(true);
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
        path={props.path}
        render={(data) => {
          endpoint = props.endpoint || false;
          console.log(endpoint);
          if (props.computedMatch.params.id) {
            endpoint = `${props.endpoint}/${props.computedMatch.params.id}`;
          }

          if (isLoggedIN) {
            return (
              <>
                {loading ? (
                  <UserContext.Provider value={info}>
                    <div>
                      <NavBar></NavBar>
                      <main>
                        <props.component></props.component>
                      </main>
                    </div>
                  </UserContext.Provider>
                ) : (
                  <div className="loader"></div>
                )}
              </>
            );
          } else {
            return (
              <Redirect to={{ pathname: "/login", state: pathname }}></Redirect>
            );
          }
        }}></Route>
    );
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path={"/login"} component={Home}></Route>
          <Route exact path={"/signup"} component={SignUP} />
          <SecureRoute
            exact
            endpoint={"/posts"}
            path={"/"}
            component={Forum}></SecureRoute>
          <SecureRoute
            exact
            endpoint={"/authenticate"}
            path={"/createpost"}
            component={CreatePost}></SecureRoute>
          <SecureRoute
            endpoint={"/post"}
            path={"/post/:id"}
            component={PostViewer}></SecureRoute>
          <SecureRoute
            path={"/delete_account"}
            component={Delete}></SecureRoute>
          <Route path={"/*"} component={NoResult} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
