import { useState, useEffect } from "react";
import Nav from "./nav";
import Projects from "./pages/projects/projects";
import Collaborators from "./pages/collaborators";
import Content from "./pages/content";

export default function Dashboard(props) {
  const [Active, setActive] = useState("projects");
  const [projects, setProjects] = useState({});
  const [content, setcontent] = useState({});
  const [collabs, setCollabs] = useState({});

  useEffect(() => {
    async function fetchData() {
      let content = await fetch("http://localhost/content")
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      let collaborators = await fetch("http://localhost/collaborators")
        .then((resp) => resp.json())
        .then((resp) => {
          return resp;
        });

      setProjects(projects);
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
        {Active === "content" && <Content content={content} />}
        {Active === "collaborators" && <Collaborators collabs={collabs} />}
      </div>
    </div>
  );
}
