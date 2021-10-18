import { useState } from "react";
import BASE_URL from "./Utl";

const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token} `,
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        // isPublic: true,
      }),
    });
    const info = await resp.json();
    props.setRoutines([...props.routines, info]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        ></input>
        <input
          type="checkbox"
          placeholder="Public?"
          defaultChecked={isPublic}
          onChange={() => {
            setIsPublic(!isPublic);
          }}
        ></input>
        <button>ADD ROUTINE</button>
      </form>
    </>
  );
};

export default MyRoutines;
