import { useState } from "react";
import BASE_URL from "./Utl";

const NewActivity = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token} `,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    const info = await resp.json();
    props.setActivities([...props.activities, info]);
  };
  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button>ADD ACTIVITY</button>
      </form>
    </>
  );
};

export default NewActivity;
