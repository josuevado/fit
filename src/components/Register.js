import { useState } from "react";
import BASE_URL from "./Utl";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormessage("");

    const resp = await fetch(`${BASE_URL}/users/register`, {
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

    
    props.setToken(info.token);
    props.setLoggedIn(true);
    props.history.push("/");
  };

  return (
    <>
      <div>
        <h1>REGISTER</h1>
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
          <button>Register</button>
          <p>{errormessage}</p>
        </form>
      </div>
    </>
  );
};

export default Register;
