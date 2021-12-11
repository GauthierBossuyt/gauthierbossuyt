import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Project from "./project";

const empty_form = {
  name: "Name of project",
  client: "Client",
  description: "The description of the project",
  year: "year",
  url: "The website link",
  image: "The image link",
  collaborators: [],
};

export default function Projects(props) {
  const [data, setData] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [error, setError] = useState("");
  const [change, setChange] = useState(false);
  const [create, setCreate] = useState(false);
  const [projectChange, setProjectChange] = useState({});
  const [addedCollabs, setAddedCollabs] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [ProjectDelete, setProjectDelete] = useState({});

  useEffect(() => {
    async function fetchData() {
      let projects = await fetch("http://localhost/projects")
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      let collaborators = await fetch("http://localhost/collaborators")
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      setData(projects);
      setCollaborators(collaborators);
    }
    fetchData();
  }, []);

  const toggleFavourite = async (id, user) => {
    fetch("http://localhost/projects", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        _id: user._id,
        code: props.code,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        let index = data.findIndex((project) => project._id === id);
        let NewData = data;
        NewData[index] = user;
        setData([...NewData]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const toggleEdit = async (id, user) => {
    setAddedCollabs([]);
    setProjectChange(empty_form);
    setProjectChange(user);
    let array = [];
    user.collaborators.forEach((person) => {
      array.push(person);
    });
    setAddedCollabs([...array]);

    setChange(!change);
  };

  const toggleDelete = async (id, user, index) => {
    setProjectDelete(user);
    setDelete(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = [];
    for (let values = 0; values < e.target.length; values++) {
      data.push(e.target.elements[values].value);
    }
    data = {
      name: data[0],
      description: data[2],
      client: data[1],
      year: data[3],
      image: data[5],
      url: data[4],
      collaborators: addedCollabs,
    };
    if (create) {
      addProjectToDatabase(data);
    } else if (change) {
      updateProjectDatabase(data, projectChange._id);
    }
  };

  const addProjectToDatabase = async (project) => {
    fetch("http://localhost/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project: project,
        id: project._id,
        code: props.code,
      }),
    }).catch((err) => {
      setError(err);
    });
  };

  const updateProjectDatabase = async (project, id) => {
    fetch("http://localhost/projects", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: project,
        _id: id,
        code: props.code,
      }),
    }).catch((err) => {
      setError(err);
    });
  };

  const deleteProjectDatabase = async () => {
    fetch("http://localhost/projects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ProjectDelete._id,
        code: props.code,
      }),
    }).catch((err) => {
      setError(err);
    });
  };

  const addCollab = (name) => {
    console.log(addedCollabs);
    console.log(name);
    let index = collaborators.findIndex((person) => person.name === name);
    let inject = true;
    projectChange.collaborators.forEach((element) => {
      if (name === element.name) inject = false;
    });
    if (inject) {
      setAddedCollabs([...addedCollabs, collaborators[index]]);
    }
  };

  return (
    <div>
      <h1 id="title"> Projects </h1>
      <h2> {error} </h2>
      {Delete ? (
        <div className="warning-delete-project">
          <div>
            <h1>Are you sure you want to delete this project?</h1>
            <div className="button-warning-group">
              <button
                onClick={() => {
                  setProjectDelete({});
                  deleteProjectDatabase();
                  setDelete(false);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setProjectDelete({});
                  setDelete(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        id="add_project"
        onClick={() => {
          setProjectChange(empty_form);
          setCreate(true);
          setAddedCollabs([]);
        }}
      >
        + add a Project
      </button>
      <div className="admin-projects">
        {data.length > 0 ? (
          data.map((project, index) => (
            <Project
              key={project._id}
              index={index}
              project={project}
              favourite={toggleFavourite}
              edit={toggleEdit}
              delete={toggleDelete}
            />
          ))
        ) : (
          <h1> Loading... </h1>
        )}
      </div>
      {change || create ? (
        <div className="admin-projects-form">
          <div className="admin-form-div">
            <form
              onSubmit={(e) => {
                setChange(false);
                setCreate(false);
                setProjectChange(empty_form);
                setAddedCollabs([]);
                onSubmit(e);
              }}
            >
              <h1>{projectChange.name}</h1>
              <div className="Inputs">
                <input type="text" defaultValue={projectChange.name}></input>
                <input type="text" defaultValue={projectChange.client}></input>
              </div>
              <div className="Inputs">
                <textarea id="description">
                  {projectChange.description}
                </textarea>
              </div>
              <div className="Inputs">
                <input
                  type="text"
                  id="year"
                  defaultValue={projectChange.year}
                ></input>
                <input
                  type="text"
                  id="url"
                  defaultValue={projectChange.url}
                ></input>
              </div>
              <input
                id="image"
                type="text"
                defaultValue={projectChange.image}
              ></input>
              <div className="Inputs">
                <select name="Collaborators" id="collaborators">
                  {collaborators.map((being) => (
                    <option
                      defaultValue={being._id}
                      onClick={(e) => {
                        addCollab(e.target.value);
                      }}
                    >
                      {being.name}
                    </option>
                  ))}
                </select>
                {addedCollabs.length > 0 ? (
                  <p id="collabs">
                    {addedCollabs.map((person) => person.name + " ")}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="Inputs">
                <button
                  onClick={() => {
                    setChange(false);
                    setCreate(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
