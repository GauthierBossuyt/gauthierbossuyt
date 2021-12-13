import { useState, useEffect } from "react";
import Nav from "./nav";
import Projects from "./pages/projects/projects";
import Collaborators from "./pages/collaborators";
import Content from "./pages/content";

export default function Dashboard(props) {
  const [Active, setActive] = useState("projects");
  const [content, setcontent] = useState({});
  const [collabs, setCollabs] = useState({});

  useEffect(() => {
    async function fetchData() {
      let content = await fetch(
        "https://gauthierbossuyt-api.herokuapp.com/content"
      )
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      let collaborators = await fetch(
        "https://gauthierbossuyt-api.herokuapp.com/collaborators"
      )
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      setcontent(content);
      setCollabs(collaborators);
    }
    fetchData();
  }, []);

  const displayActive = (active) => {
    setActive(active);
  };

  return (
    <div className="admin_dashboard">
      <Nav active={displayActive} />
      <div className="dashboard">
        {Active === "projects" && <Projects code={props.code} />}
        {Active === "content" && (
          <Content content={content} code={props.code} />
        )}
        {Active === "collaborators" && (
          <Collaborators collabs={collabs} code={props.code} />
        )}
      </div>
    </div>
  );
}
