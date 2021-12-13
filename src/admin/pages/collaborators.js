import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Delete from "../../imgs/delete.svg";
import Edit from "../../imgs/edit.svg";

const empty_form = { _id: "0", name: "Name", url: "Link to profile" };

export default function Collaborators(props) {
  const [collaborators, setCollaborators] = useState([]);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [personChange, setPersonChange] = useState({});

  useEffect(() => {
    async function fetchData() {
      let collaborators = await fetch(
        "https://gauthierbossuyt-api.herokuapp.com/collaborators"
      )
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      setCollaborators(collaborators);
    }
    fetchData();
  }, []);

  const editCollab = (id, data) => {
    setPersonChange(data);
    setEdit(true);
  };

  const deleteCollab = async (id, data) => {
    // fetch("https://gauthierbossuyt-api.herokuapp.com/", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: data._id,
    //     code: props.code,
    //   }),
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => console.log(resp));
  };

  const saveToDatabase = async (e) => {
    let data = e.target.elements;
    if (edit) {
      fetch("https://gauthierbossuyt-api.herokuapp.com/collaborators", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data[0].value,
          url: data[1].value,
          id: personChange._id,
          code: props.code,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    } else if (create) {
      fetch("https://gauthierbossuyt-api.herokuapp.com/collaborators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data[0].value,
          url: data[1].value,
          code: props.code,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    }
    setCreate(false);
    setEdit(false);
  };

  return (
    <div className="admin-collaborators">
      <h1>collaborators</h1>
      <button
        id="add_project"
        onClick={() => {
          setPersonChange(empty_form);
          setCreate(true);
        }}
      >
        + add Person
      </button>
      <div className="admin-collabs">
        {collaborators.map((person) => (
          <div key={person._id} className="admin-collab-info">
            <h1>{person.name}</h1>
            <div>
              <img
                id="edit"
                src={Edit}
                alt={person.name + "edit"}
                onClick={() => editCollab(person._id, person)}
              />
              <img
                id="delete"
                src={Delete}
                alt={person.name + "delete"}
                onClick={() => deleteCollab(person._id, person)}
              />
            </div>

            <p>{person.url}</p>
          </div>
        ))}
      </div>
      {edit || create ? (
        <div className="admin-collabs-form">
          <form
            id={personChange._id}
            onSubmit={(e) => {
              e.preventDefault();
              saveToDatabase(e);
            }}
          >
            <input type="text" defaultValue={personChange.name}></input>
            <input type="text" defaultValue={personChange.url}></input>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCreate(false);
                  setEdit(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
