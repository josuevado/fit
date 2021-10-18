import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import MyRoutines from "./MyRoutines";
import BASE_URL from "./Utl";

const Routines = ({ token }) => {
  const [routines, setRoutines] = useState([]);

  const fetchRoutines = async () => {
    const resp = token
      ? await fetch(`${BASE_URL}/routines`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : await fetch(`${BASE_URL}/routines`);
    const info = await resp.json();
    setRoutines(info);
  };

  useEffect(() => {
    fetchRoutines();
  }, [token]);

  const handleDelete = async (routineId) => {
    const resp = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await resp.json();
    fetchRoutines();
  };

  return (
    <>
      <Link to="/My-routines">ADD ROUTINE</Link>
      <Route path="/My-routines">
        <MyRoutines
          routines={routines}
          setRoutines={setRoutines}
          token={token}
        ></MyRoutines>
      </Route>

      {routines.map((routine) => {
        return (
          (
            <div key={routine._id}>
              <h3>NAME: {routine.name}</h3>
              <b>GOAL: {routine.goal}</b> ||
              <b>BY: {routine.creatorName}</b>
            </div>
          ) || <button onClick={() => handleDelete(routine._id)}>DELETE</button>
        );
      })}
    </>
  );
};

export default Routines;
