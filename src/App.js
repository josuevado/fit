import { useEffect, useState } from "react";
import { Route } from "react-router";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import MyRoutines from "./components/MyRoutines";
import NavBar from "./components/NavBar";
import Register from "./components/Register";

import Routines from "./components/Routines";
import BASE_URL from "./components/Utl";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // send token and get info
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      setToken(token);
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      console.log(info);
      setUser(info);
    };
    fetchUser();
  }, [token]);

  return (
    <div>
      <NavBar loggedIn={loggedIn} setUser={setUser} setLoggedIn={setLoggedIn} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route exact path="/Routines">
        <Routines token={token} />
      </Route>
      <Route exact path="/My-routines">
        <MyRoutines />
      </Route>
      <Route exact path="/Activities">
        <Activities token={token} />
      </Route>
      <Route
        exact
        path="/Login"
        render={(props) => (
          <Login {...props} setToken={setToken} setLoggedIn={setLoggedIn} />
        )}
      ></Route>
      <Route
        exact
        path="/Register"
        render={(props) => (
          <Register {...props} setToken={setToken} setLoggedIn={setLoggedIn} />
        )}
      ></Route>
    </div>
  );
}

export default App;
