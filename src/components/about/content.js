import React, { useState } from "react";
import Banner from "../../imgs/banner.png";
import Quote from "../../imgs/DesignNCode.svg";
import Data from "../../data/skills.json";
import project from "../../data/projects.json";
import { useEffect } from "react/cjs/react.development";

export default function Content() {
    const [data, setData] = useState({});
    const [about, setAbout] = useState("");
    const [projects, setProjects] = useState([]);
    const [collabs, setCollabs] = useState([]);

    useEffect(() => {
        async function getContent() {
            fetch("http://localhost/content")
                .then((resp) => resp.json())
                .then((resp) => {
                    setAbout(resp[0]);
                    setData(createArrayOfSkills(resp[1]));
                });
        }

        async function getProjects() {
            fetch("http://localhost/projects")
                .then((resp) => resp.json())
                .then((resp) => {
                    setProjects(
                        resp.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        })
                    );
                });
        }

        async function getCollabs() {
            fetch("http://localhost/collaborators")
                .then((resp) => resp.json())
                .then((resp) => {
                    setCollabs(
                        resp.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        })
                    );
                });
        }

        getContent();
        getProjects();
        getCollabs();
    }, []);

    const createArrayOfSkills = (data) => {
        let array = [];
        for (const skill in data) {
            if (data[skill].name) {
                array.push(data[skill]);
            }
        }
        return array;
    };

    return (
        <div>
            <div className="banner">
                <img src={Banner} alt="me, myself and I"></img>
            </div>
            <div className="about_content">
                <img src={Quote} alt="inspiring quote"></img>
                <p>{about.description}</p>
                <div className="skillz">
                    {data[0]
                        ? data.map((skill) => (
                              <div key={skill.name}>
                                  <h1>{skill.name}</h1>
                                  <p>{skill.text}</p>
                              </div>
                          ))
                        : ""}
                </div>
                <div className="collaborated">
                    <h1>Worked with</h1>
                    {collabs.map((person) => (
                        <p
                            className="person"
                            onClick={() => {
                                window.open(person.url, "_blank");
                            }}
                        >
                            {person.name}
                        </p>
                    ))}
                </div>
                {projects[0] ? (
                    <div className="projects">
                        <h1>Projects</h1>
                        <div className="project">
                            <p id="labels">Name</p>
                            <p id="labels">Organization</p>
                            <p id="labels">Year</p>
                        </div>
                        {projects.map((project) => (
                            <div key={project.id} className="project">
                                <p>{project.name}</p>
                                <p>{project.client}</p>
                                <p>{project.year}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
