const Home = (props) => {
  return (
    <>
      {!props.user && <h1>Welcome to Fitness Tracker</h1>}

      {props.user && <h1>Welcome {props.user.username}!</h1>}
    </>
  );
};

export default Home;
