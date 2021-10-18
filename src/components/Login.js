import { useState } from "react";
import BASE_URL from "./Utl";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormessage("");

    const resp = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await resp.json();
    if (info.error) {
      return setErrormessage(info.message);
    }
    localStorage.setItem("token", info.token);

    // save token and username in states?
    props.setToken({
      token: info.token,
      id: info.user.id,
      username: info.user.username,
    });
    props.setLoggedIn(true);
    props.history.push("/");
  };

  return (
    <>
      <div>
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="username"
            minLength={4}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            required
          ></input>
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          ></input>
          <br></br>
          <button>Login</button>
          <p>{errormessage}</p>
        </form>
      </div>
    </>
  );
};

export default Login;
