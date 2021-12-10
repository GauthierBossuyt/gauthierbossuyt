import { useState } from "react";

import Collaborators from "../imgs/collaborators.svg";
import Content from "../imgs/content.svg";
import Project from "../imgs/projects.svg";

export default function Nav(props) {
    const [projects, setProjects] = useState(true);
    const [content, setContent] = useState(false);
    const [collaborators, setCollaborators] = useState(false);
    const [prevActive, setActive] = useState(0);

    const changeNav = (e) => {
        let list = [setProjects, setContent, setCollaborators];
        let names = ["projects", "content", "collaborators"];
        list[e.target.id](true);
        list[prevActive](false);
        setActive(e.target.id);
        props.active(names[e.target.id]);
    };

    return (
        <div className="admin_nav">
            <div className="nav-icons">
                <img
                    src={Project}
                    className={projects ? "active" : "inactive"}
                    alt="projects"
                    id="0"
                    onClick={changeNav}
                />
                <img
                    src={Content}
                    className={content ? "active" : "inactive"}
                    alt="content"
                    id="1"
                    onClick={changeNav}
                />
                <img
                    src={Collaborators}
                    className={collaborators ? "active" : "inactive"}
                    alt="collaborators"
                    id="2"
                    onClick={changeNav}
                />
            </div>
            <div className="nav-text">
                <h1>GAUTHIER BOSSUYT</h1>
            </div>
        </div>
    );
}
