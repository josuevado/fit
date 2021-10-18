import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import NewActivity from "./NewActivity";
import BASE_URL from "./Utl";

const Activities = ({ token }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
    const info = await resp.json();
    console.log(info);
    setActivities(info);
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <Link to="/NewActivity">ADD ACTIVITY</Link>
      <Route path="/NewActivity">
        <NewActivity
          activities={activities}
          setActivities={setActivities}
          token={token}
        ></NewActivity>
      </Route>
      {activities.map((activity) => {
        return (
          <div key={activity._id}>
            <h3>NAME: {activity.name}</h3>
            <b>DESCRIPTION: {activity.description}</b>
          </div>
        );
      })}
    </>
  );
};

export default Activities;
