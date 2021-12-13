import { useEffect, useState } from "react";
import Edit from "../../imgs/edit.svg";

export default function Content(props) {
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState({});
  const [editAbout, setEditAbout] = useState(false);
  const [editSkill, setEditSkill] = useState(false);
  const [content, setContent] = useState({});

  useEffect(() => {
    async function fetchData() {
      let content = await fetch(
        "https://gauthierbossuyt-api.herokuapp.com/content"
      )
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });
      setAbout(content[0]);
      setSkills(content[1]);
    }
    fetchData();
  }, []);

  const addChangesToDatabase = async (e) => {
    e.preventDefault();
    if (editSkill) {
      let data = skills;
      data[content.target].text = e.target.elements[0].value;
      fetch("https://gauthierbossuyt-api.herokuapp.com/content", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: skills,
          code: props.code,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    } else if (editAbout) {
      let data = about;
      data.description = e.target.elements[0].value;
      fetch("https://gauthierbossuyt-api.herokuapp.com/content", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data,
          code: props.code,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    }
  };

  return (
    <div>
      <h1>Content</h1>
      <div className="admin-content">
        {about.description ? (
          <div className="admin-about-me">
            <div className="admin-content-header">
              <h1>{about.type}</h1>
              <img
                id="edit"
                src={Edit}
                alt={"edit"}
                onClick={() => {
                  setContent({ target: "about", text: about.description });
                  setEditAbout(true);
                }}
              />
            </div>
            <p>{about.description}</p>
          </div>
        ) : (
          ""
        )}
        {skills.Web_Development ? (
          <div className="admin-skills">
            <h1>{skills.type}</h1>
            <div className="admin-content-header">
              <h2>{skills.Web_Development.name}</h2>
              <img
                id="edit"
                src={Edit}
                alt={"edit"}
                onClick={() => {
                  setContent({
                    target: "Web_Development",
                    text: skills.Web_Development.text,
                  });
                  setEditSkill(true);
                }}
              />
            </div>
            <p>{skills.Web_Development.text}</p>
            <div className="admin-content-header">
              <h2>{skills.Creative_Coding.name}</h2>
              <img
                id="edit"
                src={Edit}
                alt={"edit"}
                onClick={() => {
                  setContent({
                    target: "Creative_Coding",
                    text: skills.Creative_Coding.text,
                  });
                  setEditSkill(true);
                }}
              />
            </div>
            <p>{skills.Creative_Coding.text}</p>
            <div className="admin-content-header">
              <h2>{skills.Web_Design.name}</h2>
              <img
                id="edit"
                src={Edit}
                alt={"edit"}
                onClick={() => {
                  setContent({
                    target: "Web_Design",
                    text: skills.Web_Design.text,
                  });
                  setEditSkill(true);
                }}
              />
            </div>
            <p>{skills.Web_Design.text}</p>
            <div className="admin-content-header">
              <h2>{skills.Live_Visuals.name}</h2>
              <img
                id="edit"
                src={Edit}
                alt={"edit"}
                onClick={() => {
                  setContent({
                    target: "Live_Visuals",
                    text: skills.Live_Visuals.text,
                  });
                  setEditSkill(true);
                }}
              />
            </div>
            <p>{skills.Live_Visuals.text}</p>
          </div>
        ) : (
          ""
        )}
      </div>
      {editAbout || editSkill ? (
        <div className="admin-content-form">
          <form
            onSubmit={(e) => {
              addChangesToDatabase(e);
              setEditAbout(false);
              setEditSkill(false);
            }}
          >
            <h1>EDIT CONTENT</h1>
            <textarea defaultValue={content.text}></textarea>
            <div>
              <button
                onClick={() => {
                  setContent("");
                  setEditSkill(false);
                  setEditAbout(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
