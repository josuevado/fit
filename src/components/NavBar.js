import { Link } from "react-router-dom";

const NavBar = (props) => {
  const loggedIn = props.loggedIn;
  return (
    <>
      <Link to="/">HOME</Link> ||
      <Link to="/Routines">ROUTINES</Link> ||
      {loggedIn && (
        <>
          <Link to="/My-routines">MY ROUTINES</Link>{" "}
        </>
      )}{" "}
      ||
      <Link to="/Activities">ACTIVITIES</Link> ||
      {!loggedIn && (
        <>
          <Link to="/Login">LOGIN</Link>
        </>
      )}{" "}
      ||
      {!loggedIn && (
        <>
          <Link to="/Register">REGISTER</Link>
        </>
      )}
      ||
      {loggedIn && (
        <>
          <Link
            to="/Login"
            onClick={() => {
              props.setUser(null);
              props.setLoggedIn(false);
              localStorage.setItem("token", "");
            }}
          >
            Logout
          </Link>
        </>
      )}
    </>
  );
};

export default NavBar;
